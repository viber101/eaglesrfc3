export type PollChoice = 'win' | 'draw' | 'loss';
export type PollCounts = Record<PollChoice, number>;

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

// Use relative /api path so it works on both localhost and production
const API_BASE = '/api';

export const getPollCounts = async (): Promise<PollCounts> => {
  const res = await fetch(`${API_BASE}/poll/${POLL_KEY}/counts`);

  if (!res.ok) {
    throw new Error(`Failed to fetch poll counts: ${res.status}`);
  }

  const data = await res.json();
  return {
    win: Number(data.win) || 0,
    draw: Number(data.draw) || 0,
    loss: Number(data.loss) || 0
  };
};

export const castVote = async (choice: PollChoice, sessionToken: string): Promise<CastVoteResult> => {
  const res = await fetch(`${API_BASE}/poll/${POLL_KEY}/vote`, {
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
    total: Number(data.total) || 0
  };
};
