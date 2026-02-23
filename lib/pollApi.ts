export type PollChoice = 'win' | 'draw' | 'loss';
export type PollCounts = Record<PollChoice, number>;
export type PollCountsSnapshot = {
  counts: PollCounts;
  total: number;
  activePollsTotal: number;
};

export type CastVoteResult = {
  accepted: boolean;
  counts: PollCounts;
  total: number;
  activePollsTotal: number;
};

export class PollApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PollApiConfigError';
  }
}

const configuredPollKey = (import.meta.env.VITE_POLL_KEY ?? '').trim();
const DEFAULT_POLL_KEY = configuredPollKey || 'eagles-vs-golden-badgers';
const configuredApiBase = (import.meta.env.VITE_POLL_API_BASE ?? '').trim();
const API_BASE = configuredApiBase ? configuredApiBase.replace(/\/+$/, '') : '/api';

export const getPollCounts = async (pollKey = DEFAULT_POLL_KEY): Promise<PollCountsSnapshot> => {
  const res = await fetch(`${API_BASE}/poll/${pollKey}/counts`);

  if (!res.ok) {
    throw new Error(`Failed to fetch poll counts: ${res.status}`);
  }

  const data = await res.json();
  const counts = {
    win: Number(data.win) || 0,
    draw: Number(data.draw) || 0,
    loss: Number(data.loss) || 0
  };
  const total = Number(data.total) || counts.win + counts.draw + counts.loss;
  const activePollsTotal = Number(data.active_polls_total) || 0;

  return { counts, total, activePollsTotal };
};

export const castVote = async (choice: PollChoice, sessionToken: string, pollKey = DEFAULT_POLL_KEY): Promise<CastVoteResult> => {
  const res = await fetch(`${API_BASE}/poll/${pollKey}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choice, session_token: sessionToken })
  });

  if (!res.ok) {
    throw new Error(`Failed to cast vote: ${res.status}`);
  }

  const data = await res.json();
  return {
    accepted: Boolean(data.accepted),
    counts: {
      win: Number(data.win) || 0,
      draw: Number(data.draw) || 0,
      loss: Number(data.loss) || 0
    },
    total: Number(data.total) || 0,
    activePollsTotal: Number(data.active_polls_total) || 0
  };
};
