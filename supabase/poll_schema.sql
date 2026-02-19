-- 1) Poll registry
create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  poll_key text not null unique,
  home_team text not null,
  away_team text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2) Votes
create table if not exists poll_votes (
  id bigint generated always as identity primary key,
  poll_id uuid not null references polls(id) on delete cascade,
  choice text not null check (choice in ('win', 'draw', 'loss')),
  session_token text not null,
  created_at timestamptz not null default now(),
  unique (poll_id, session_token)
);

create index if not exists idx_poll_votes_poll_id on poll_votes(poll_id);
create index if not exists idx_poll_votes_created_at on poll_votes(created_at);

-- 3) Seed one active poll
insert into polls (poll_key, home_team, away_team, is_active)
values ('eagles-vs-golden-badgers', 'Eagles', 'Golden Badgers', true)
on conflict (poll_key) do nothing;

-- 4) Public counts function
create or replace function get_poll_counts(p_poll_key text)
returns table(win bigint, draw bigint, loss bigint, total bigint)
language sql
security definer
set search_path = public
as $$
  with p as (
    select id from polls where poll_key = p_poll_key and is_active = true limit 1
  )
  select
    count(*) filter (where pv.choice = 'win') as win,
    count(*) filter (where pv.choice = 'draw') as draw,
    count(*) filter (where pv.choice = 'loss') as loss,
    count(*) as total
  from poll_votes pv
  join p on p.id = pv.poll_id;
$$;

-- 5) Vote function (idempotent per session token)
create or replace function cast_vote(
  p_poll_key text,
  p_choice text,
  p_session_token text
)
returns table(accepted boolean, win bigint, draw bigint, loss bigint, total bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_poll_id uuid;
  v_inserted integer := 0;
begin
  if p_choice not in ('win', 'draw', 'loss') then
    raise exception 'Invalid choice';
  end if;

  select id into v_poll_id
  from polls
  where poll_key = p_poll_key and is_active = true
  limit 1;

  if v_poll_id is null then
    raise exception 'Poll not found';
  end if;

  insert into poll_votes (poll_id, choice, session_token)
  values (v_poll_id, p_choice, p_session_token)
  on conflict (poll_id, session_token) do nothing;

  get diagnostics v_inserted = row_count;

  return query
  select
    (v_inserted > 0) as accepted,
    c.win, c.draw, c.loss, c.total
  from get_poll_counts(p_poll_key) c;
end;
$$;

-- 6) Lock down table access; expose RPC only
revoke all on table polls from anon, authenticated;
revoke all on table poll_votes from anon, authenticated;
grant execute on function get_poll_counts(text) to anon, authenticated;
grant execute on function cast_vote(text, text, text) to anon, authenticated;
