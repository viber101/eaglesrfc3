import { isSupabaseConfigured, supabase } from './supabaseClient';

export type PollChoice = 'win' | 'draw' | 'loss';
export type PollCounts = Record<PollChoice, number>;

type PollCountsRow = {
  win: number | string | null;
  draw: number | string | null;
  loss: number | string | null;
  total?: number | string | null;
};

type CastVoteRow = PollCountsRow & {
  accepted: boolean | null;
};

export type CastVoteResult = {
  accepted: boolean;
  counts: PollCounts;
  total: number;
};

export class PollApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PollApiConfigError';
  }
}

const POLL_KEY = (import.meta.env.VITE_POLL_KEY ?? 'eagles-vs-golden-badgers').trim();

const toSafeInt = (value: number | string | null | undefined) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return Math.floor(parsed);
};

const normalizeCounts = (row: PollCountsRow | null | undefined): PollCounts => ({
  win: toSafeInt(row?.win),
  draw: toSafeInt(row?.draw),
  loss: toSafeInt(row?.loss)
});

const getFirstRow = <T>(rows: T | T[] | null): T | null => {
  if (!rows) {
    return null;
  }
  if (Array.isArray(rows)) {
    return rows[0] ?? null;
  }
  return rows;
};

const ensureConfigured = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new PollApiConfigError('Supabase configuration is missing.');
  }
  if (!POLL_KEY) {
    throw new PollApiConfigError('Poll key is missing.');
  }
};

export const getPollCounts = async (): Promise<PollCounts> => {
  ensureConfigured();
  const { data, error } = await supabase.rpc('get_poll_counts', {
    p_poll_key: POLL_KEY
  });

  if (error) {
    throw error;
  }

  const row = getFirstRow(data as PollCountsRow[] | PollCountsRow | null);
  return normalizeCounts(row);
};

export const castVote = async (choice: PollChoice, sessionToken: string): Promise<CastVoteResult> => {
  ensureConfigured();

  const { data, error } = await supabase.rpc('cast_vote', {
    p_poll_key: POLL_KEY,
    p_choice: choice,
    p_session_token: sessionToken
  });

  if (error) {
    throw error;
  }

  const row = getFirstRow(data as CastVoteRow[] | CastVoteRow | null);

  return {
    accepted: Boolean(row?.accepted),
    counts: normalizeCounts(row),
    total: toSafeInt(row?.total)
  };
};
