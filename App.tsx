
import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Card from './components/Card';
import { MOCK_TRENDING_VIDEOS, MOCK_SHOP_PRODUCTS, MOCK_NEWS, MOCK_STANDINGS, MOCK_PLAYERS, MOCK_TV, MOCK_ATHLETES } from './constants';

type FixtureItem = {
  id: string;
  week: string;
  month: string;
  date: string;
  day: string;
  category: string;
  venue: string;
  time: string;
  home: string;
  away: string;
};

type FixtureScore = {
  home: number;
  away: number;
  status: string;
};

type PollChoice = 'win' | 'loss' | 'draw';
type PollCounts = Record<PollChoice, number>;

const POLL_COUNTS_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-counts-v1';
const POLL_VOTE_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-vote-v1';
const POLL_LAST_SAVED_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-last-saved-v1';
const POLL_SESSION_VOTE_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-session-vote-v1';

const FIXTURE_SCORE_OVERRIDES: Record<string, FixtureScore> = {};

const cleanCell = (value: string) => value.replace(/"/g, '').replace(/\s+/g, ' ').trim();
const extractDateNumber = (value: string) => value.match(/\d+/)?.[0] ?? value;
const normalizeTeam = (value: string) => cleanCell(value).toLowerCase();
const isEaglesTeam = (value: string) => normalizeTeam(value).includes('eagles');
const toFixtureKey = (fixture: FixtureItem) => `${fixture.week}-${normalizeTeam(fixture.home)}-${normalizeTeam(fixture.away)}`;

const toFixtureDateLabel = (fixture: FixtureItem) => {
  const month = fixture.month ? fixture.month.slice(0, 3).toUpperCase() : 'TBC';
  const dateNumber = extractDateNumber(fixture.date);
  const day = fixture.day ? fixture.day.slice(0, 3).toUpperCase() : '';
  return `${day} ${month} ${dateNumber}`.trim();
};

const parseFixturesCsv = (csvText: string): FixtureItem[] => {
  const fixtures: FixtureItem[] = [];
  const lines = csvText.split(/\r?\n/);
  const context = {
    week: '',
    month: '',
    date: '',
    day: '',
    category: 'Men',
    venue: '',
    time: ''
  };

  for (const line of lines) {
    const cells = line.split(',').map(cleanCell);
    if (cells.every((cell) => !cell)) {
      continue;
    }

    const rowTitle = (cells[0] || '').toLowerCase();
    if (
      rowTitle.includes('fixtures') ||
      rowTitle === 'week' ||
      rowTitle.includes('break') ||
      rowTitle.includes('semi') ||
      rowTitle === 'final'
    ) {
      continue;
    }

    if (/^\d+$/.test(cells[0])) context.week = cells[0];
    if (cells[1] && cells[1].toLowerCase() !== 'month') context.month = cells[1];
    if (cells[2] && !/date|day/i.test(cells[2])) context.date = cells[2];
    if (cells[3] && /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(cells[3])) {
      context.day = cells[3];
    }
    if (cells[4] && /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(cells[4])) {
      context.day = cells[4];
    }

    if (cells[4] && !/category/i.test(cells[4]) && !/sunday|saturday/i.test(cells[4])) {
      context.category = cells[4];
    } else if (/men|women/i.test(cells[3])) {
      context.category = cells[3];
    }

    if (cells[5] && cells[5].toLowerCase() !== 'venue') context.venue = cells[5];
    if (cells[6] && cells[6].toLowerCase() !== 'time') context.time = cells[6];

    const vsIndex = cells.findIndex((cell) => cell.toLowerCase() === 'vs');
    if (vsIndex === -1) {
      continue;
    }

    let home = '';
    for (let i = vsIndex - 1; i >= 0; i -= 1) {
      if (cells[i]) {
        home = cells[i];
        break;
      }
    }

    let away = '';
    for (let i = vsIndex + 1; i < cells.length; i += 1) {
      if (cells[i]) {
        away = cells[i];
        break;
      }
    }

    if (!home || !away) {
      continue;
    }

    fixtures.push({
      id: `${context.week || 'X'}-${fixtures.length + 1}`,
      week: context.week || 'TBC',
      month: context.month || 'TBC',
      date: context.date || 'TBC',
      day: context.day || 'TBC',
      category: context.category || 'Men',
      venue: cells[5] || context.venue || 'TBC',
      time: cells[6] || context.time || 'TBC',
      home,
      away
    });
  }

  return fixtures;
};

const FixturesSlider: React.FC = () => {
  const [fixtures, setFixtures] = useState<FixtureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/fixtures/2026-cura-championship-fixtures.csv')
      .then((response) => response.text())
      .then((csvText) => {
        if (isMounted) {
          setFixtures(parseFixturesCsv(csvText));
        }
      })
      .catch(() => {
        if (isMounted) {
          setFixtures([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [fixtures.length, isLoading]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.9;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#081534] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-[11px] font-black uppercase tracking-widest">2026 CURA Fixtures</h3>
        <span className="text-[#9fb0c4] text-[10px] font-bold uppercase tracking-wide">Slide</span>
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <button onClick={() => scroll('left')} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center text-[#081534] shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center text-[#081534] shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto pb-2 space-x-3 snap-x snap-mandatory scrollbar-hide">
          {isLoading && (
            <div className="min-w-[270px] bg-[#e8ecf2] p-4 border-t-4 border-[#F5A623]">
              <p className="text-[#081534] text-sm font-black uppercase">Loading Fixtures...</p>
            </div>
          )}

          {!isLoading && fixtures.map((fixture) => {
            const score = FIXTURE_SCORE_OVERRIDES[toFixtureKey(fixture)];
            return (
              <article key={fixture.id} className="min-w-[270px] snap-start bg-[#e8ecf2] text-black border-t-4 border-[#F5A623] p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#bdd0e1] text-[#081534] text-[10px] px-1.5 py-0.5 font-black uppercase">{fixture.category}</span>
                  <span className="text-[10px] text-[#4f647a] font-black uppercase">{toFixtureDateLabel(fixture)}</span>
                  <span className="text-[10px] text-[#4f647a] font-black uppercase ml-auto">{fixture.time}</span>
                </div>
                <p className={`text-2xl font-black uppercase italic tracking-tight leading-none ${isEaglesTeam(fixture.home) ? 'text-[#F5A623]' : 'text-black'}`}>{fixture.home}</p>
                <p className={`text-2xl font-black uppercase italic tracking-tight leading-none mt-2 ${isEaglesTeam(fixture.away) ? 'text-[#F5A623]' : 'text-black'}`}>{fixture.away}</p>

                <div className="mt-4 p-2.5 bg-white/70 rounded border border-[#d5dde8]">
                  {score ? (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#4f647a]">{score.status}</span>
                      <span className="text-lg font-black text-[#081534]">{score.home} - {score.away}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#4f647a]">Score</span>
                      <span className="text-lg font-black text-[#081534]">-- : --</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#cfd7e2] flex items-center justify-between">
                  <span className="text-[11px] text-[#4f647a] font-black uppercase">Week {fixture.week}</span>
                  <span className="text-[11px] text-[#081534] font-black uppercase">{fixture.venue}</span>
                </div>
              </article>
            );
          })}

          {!isLoading && fixtures.length === 0 && (
            <div className="min-w-[270px] bg-[#e8ecf2] p-4 border-t-4 border-[#F5A623]">
              <p className="text-black text-sm font-black uppercase">No fixtures found in CSV.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MatchPollWidget: React.FC = () => {
  const [counts, setCounts] = useState<PollCounts>({ win: 0, loss: 0, draw: 0 });
  const [selectedChoice, setSelectedChoice] = useState<PollChoice | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [storageStatus, setStorageStatus] = useState<'ready' | 'blocked'>('ready');

  useEffect(() => {
    try {
      const testKey = '__poll_storage_test__';
      localStorage.setItem(testKey, 'ok');
      localStorage.removeItem(testKey);
      sessionStorage.setItem(testKey, 'ok');
      sessionStorage.removeItem(testKey);
      setStorageStatus('ready');

      const storedCounts = localStorage.getItem(POLL_COUNTS_STORAGE_KEY);
      if (storedCounts) {
        const parsedCounts = JSON.parse(storedCounts) as Partial<PollCounts>;
        setCounts({
          win: Number(parsedCounts.win) || 0,
          loss: Number(parsedCounts.loss) || 0,
          draw: Number(parsedCounts.draw) || 0
        });
      }
      const storedChoice = localStorage.getItem(POLL_VOTE_STORAGE_KEY) as PollChoice | null;
      if (storedChoice === 'win' || storedChoice === 'loss' || storedChoice === 'draw') {
        setSelectedChoice(storedChoice);
      }
      const storedLastSavedAt = localStorage.getItem(POLL_LAST_SAVED_STORAGE_KEY);
      if (storedLastSavedAt) {
        setLastSavedAt(storedLastSavedAt);
      }
      const sessionChoice = sessionStorage.getItem(POLL_SESSION_VOTE_STORAGE_KEY) as PollChoice | null;
      if (sessionChoice === 'win' || sessionChoice === 'loss' || sessionChoice === 'draw') {
        setSelectedChoice(sessionChoice);
      }
    } catch {
      setCounts({ win: 0, loss: 0, draw: 0 });
      setSelectedChoice(null);
      setLastSavedAt(null);
      setStorageStatus('blocked');
    }
  }, []);

  const totalVotes = counts.win + counts.loss + counts.draw;
  const getPct = (choice: PollChoice) => (totalVotes > 0 ? Math.round((counts[choice] / totalVotes) * 100) : 0);

  const vote = (choice: PollChoice) => {
    if (selectedChoice) {
      return;
    }
    const nextCounts: PollCounts = {
      ...counts,
      [choice]: counts[choice] + 1
    };
    setCounts(nextCounts);
    setSelectedChoice(choice);
    const now = new Date().toISOString();
    setLastSavedAt(now);
    try {
      localStorage.setItem(POLL_COUNTS_STORAGE_KEY, JSON.stringify(nextCounts));
      localStorage.setItem(POLL_VOTE_STORAGE_KEY, choice);
      localStorage.setItem(POLL_LAST_SAVED_STORAGE_KEY, now);
      sessionStorage.setItem(POLL_SESSION_VOTE_STORAGE_KEY, choice);
      setStorageStatus('ready');
    } catch {
      setStorageStatus('blocked');
    }
  };

  return (
    <div className="bg-black text-white rounded-xl p-4 border-t-2 border-[#F5A623] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-black uppercase tracking-widest">Match Poll</h3>
        <span className="text-[#F5A623] text-[10px] font-black uppercase">{totalVotes} Votes</span>
      </div>
      <div className="bg-white/10 rounded p-2 mb-3">
        <p className="text-[10px] font-black uppercase text-[#F5A623]">Stored Data (Local Browser)</p>
        <p className="text-[10px] font-bold uppercase text-white/80">
          W {counts.win} | D {counts.draw} | L {counts.loss}
        </p>
        <p className="text-[10px] font-bold uppercase text-white/60">
          Storage: {storageStatus === 'ready' ? 'Saved to Local Storage' : 'Storage Blocked'}
        </p>
        <p className="text-[10px] font-bold uppercase text-white/60">
          Last Save: {lastSavedAt ? new Date(lastSavedAt).toLocaleString() : 'Not yet'}
        </p>
      </div>
      <p className="text-sm font-black uppercase mb-1"><span className="text-[#F5A623]">Eagles</span> vs Golden Badgers</p>
      <p className="text-[10px] font-bold uppercase text-white/70 mb-3">One vote per session, no login required</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => vote('win')}
          disabled={!!selectedChoice}
          className={`py-2 rounded text-[10px] font-black uppercase tracking-wider transition-colors ${
            selectedChoice === 'win' ? 'bg-[#F5A623] text-black' : 'bg-white/10 hover:bg-white/20'
          } ${selectedChoice ? 'cursor-not-allowed opacity-80' : ''}`}
        >
          Win
        </button>
        <button
          onClick={() => vote('draw')}
          disabled={!!selectedChoice}
          className={`py-2 rounded text-[10px] font-black uppercase tracking-wider transition-colors ${
            selectedChoice === 'draw' ? 'bg-[#F5A623] text-black' : 'bg-white/10 hover:bg-white/20'
          } ${selectedChoice ? 'cursor-not-allowed opacity-80' : ''}`}
        >
          Draw
        </button>
        <button
          onClick={() => vote('loss')}
          disabled={!!selectedChoice}
          className={`py-2 rounded text-[10px] font-black uppercase tracking-wider transition-colors ${
            selectedChoice === 'loss' ? 'bg-[#F5A623] text-black' : 'bg-white/10 hover:bg-white/20'
          } ${selectedChoice ? 'cursor-not-allowed opacity-80' : ''}`}
        >
          Loss
        </button>
      </div>
      {selectedChoice && (
        <p className="text-[10px] font-bold uppercase text-[#F5A623] mb-3">
          You already voted this session: {selectedChoice}
        </p>
      )}

      <div className="space-y-2">
        {(['win', 'draw', 'loss'] as PollChoice[]).map((choice) => (
          <div key={choice}>
            <div className="flex items-center justify-between text-[10px] font-black uppercase mb-1">
              <span>{choice}</span>
              <span>{getPct(choice)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded">
              <div className="h-2 bg-[#F5A623] rounded transition-all" style={{ width: `${getPct(choice)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StandingsWidget: React.FC = () => (
  <div className="bg-white shadow-sm border-t-2 border-[#F5A623] p-0 overflow-hidden">
    <div className="flex justify-end p-4 border-b border-gray-100">
      <span className="text-[10px] font-black uppercase text-black tracking-wider">PREMIER LEAGUE</span>
    </div>
    <div className="px-2 py-4">
      <div className="grid grid-cols-12 text-[10px] font-black uppercase text-black px-4 mb-4">
        <div className="col-span-2">POS</div>
        <div className="col-span-6">TEAM</div>
        <div className="col-span-2 text-center">GD</div>
        <div className="col-span-2 text-right">PTS</div>
      </div>
      <div className="space-y-1">
        {MOCK_STANDINGS.map((s) => (
          <div 
            key={s.team} 
            className={`grid grid-cols-12 items-center px-4 py-2.5 text-[11px] font-black uppercase transition-all relative ${
              s.team === 'Eagles' 
              ? 'bg-black text-[#F5A623] border-l-4 border-[#F5A623]' 
              : 'text-black border-l-4 border-transparent'
            }`}
          >
            <div className={`col-span-2 ${s.team === 'Eagles' ? 'text-[#F5A623]' : 'text-black'}`}>{s.pos}</div>
            <div className="col-span-6 flex items-center">
              <span className={`truncate tracking-tight ${s.team === 'Eagles' ? 'text-[#F5A623]' : 'text-black'}`}>{s.team}</span>
            </div>
            <div className={`col-span-2 text-center ${s.team === 'Eagles' ? 'text-[#F5A623]' : 'text-black'}`}>{s.gd}</div>
            <div className={`col-span-2 text-right ${s.team === 'Eagles' ? 'text-[#F5A623]' : 'text-black'}`}>{s.pts}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Carousel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-16 relative">
      <SectionHeader title={title} />
      <div className="relative group">
        {canScrollLeft && (
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center shadow-lg text-[#F5A623] hover:bg-[#F5A623] hover:text-white transition-all -ml-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center shadow-lg text-[#F5A623] hover:bg-[#F5A623] hover:text-white transition-all -mr-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto pb-6 -mx-4 px-4 space-x-6 scrollbar-hide snap-x scroll-smooth">
          {children}
        </div>
      </div>
    </section>
  );
};

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/80 backdrop-blur border border-[#F5A623]/50 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
      <span className="text-[#F5A623] text-lg sm:text-xl font-black">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-white/80 text-[8px] sm:text-[10px] font-bold uppercase mt-1 tracking-wider">{label}</span>
  </div>
);

const CompactMatchHero: React.FC = () => {
  const matchKickoff = new Date('2026-02-22T14:00:00+03:00');
  const getTimeLeft = () => {
    const now = new Date();
    const diffMs = matchKickoff.getTime() - now.getTime();
    if (diffMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-transparent backdrop-blur-sm rounded-xl border border-[#F5A623]/30 p-4 sm:p-5 w-full max-w-sm sm:max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Next Match</span>
        <span className="text-white/60 text-[10px] font-medium">Nile Special Rugby</span>
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Golden Badgers */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-white text-sm sm:text-base font-black uppercase text-center leading-tight">Golden Badgers</span>
        </div>

        {/* Match Info */}
        <div className="flex flex-col items-center px-3 sm:px-4">
          <span className="text-[#F5A623] text-xl sm:text-2xl font-black">VS</span>
          <span className="text-white/70 text-[10px]">Sat 22/02</span>
          <span className="text-[#F5A623] text-[10px] font-bold">14:00</span>
        </div>

        {/* Eagles */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-white text-sm sm:text-base font-black uppercase text-center">Eagles RFC</span>
        </div>
      </div>

      {/* Venue */}
      <div className="text-center mb-3">
        <span className="text-white/50 text-[10px] uppercase tracking-widest">📍 Mukono</span>
      </div>

      {/* Countdown */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-4">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <span className="text-[#F5A623] text-lg font-black -mt-4">:</span>
        <CountdownUnit value={timeLeft.hours} label="Hrs" />
        <span className="text-[#F5A623] text-lg font-black -mt-4">:</span>
        <CountdownUnit value={timeLeft.minutes} label="Min" />
        <span className="text-[#F5A623] text-lg font-black -mt-4">:</span>
        <CountdownUnit value={timeLeft.seconds} label="Sec" />
      </div>

      {/* CTA */}
      <a
        href="https://tip.vanvaa.com/?q=MTcxMg=="
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#F5A623] hover:bg-[#D4921A] text-black text-xs font-black uppercase tracking-wider py-2.5 rounded-lg transition-colors text-center block"
      >
        Support Eagles
      </a>
    </div>
  );
};

const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
      <div className="lg:col-span-8 relative rounded-2xl overflow-hidden min-h-[400px]">
        <img src="/homehero.jpeg" alt="Eagles Rugby" className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        {/* Compact Match Overlay - Centered */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <CompactMatchHero />
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <StandingsWidget />
        <MatchPollWidget />
        <FixturesSlider />
      </div>
    </section>

    <Carousel title="Our First Team">
      {MOCK_PLAYERS.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{p.position}</p>
        </div>
      ))}
    </Carousel>

    <section className="mb-16">
      <SectionHeader title="Our History" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 lg:p-12 shadow-sm border-l-8 border-[#F5A623]">
        <div className="lg:col-span-5 h-[350px] overflow-hidden">
          <img src="/ceo.jpeg" alt="History" className="w-full h-full object-cover object-top" />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-none">A Legacy of Unity</h3>
          <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
            <p>Founded in 2019 at Kitante Primary School, Eagles Rugby Club was born to champion the hidden talents of upcountry Uganda.</p>
            <p>From unbeaten promotion runs to building a family of over 200 athletes, we fly as one heart.</p>
            <button onClick={() => onNavigate('history')} className="text-[#F5A623] font-black uppercase text-sm tracking-widest border-b-2 border-[#F5A623] pb-1 hover:text-black hover:border-black transition-all">Explore Full History</button>
          </div>
        </div>
      </div>
    </section>

    <Carousel title="Latest News">
      {MOCK_NEWS.map((n) => (
        <div key={n.id} className="flex-none w-[380px] snap-start">
          <Card item={n} />
        </div>
      ))}
    </Carousel>

    {/* Trending Videos Section */}
    <section className="mb-16">
      <SectionHeader title="Trending Videos" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TRENDING_VIDEOS.map((video) => (
          <Card key={video.id} item={video} />
        ))}
      </div>
    </section>

    {/* Shop Section */}
    <section className="mb-16">
      <SectionHeader title="Official Shop" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {MOCK_SHOP_PRODUCTS.map((product) => (
          <div key={product.id} className="group cursor-pointer bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-3">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-xs font-bold uppercase text-gray-900 leading-tight group-hover:text-[#F5A623] transition-colors">{product.name}</h3>
            <p className="text-[#F5A623] text-sm font-black mt-1">{product.price}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Eagles TV Section */}
    <section className="mb-16">
      <SectionHeader title="Eagles TV" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {MOCK_TV.map((tv) => (
          <div key={tv.id} className="group cursor-pointer">
            <div className="relative aspect-video overflow-hidden bg-gray-200 mb-2">
              <img src={tv.imageUrl} alt={tv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center text-black">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 font-bold">{tv.duration}</span>
            </div>
            <h3 className="text-xs font-bold uppercase text-gray-900 leading-tight group-hover:text-[#F5A623] transition-colors">{tv.title}</h3>
          </div>
        ))}
      </div>
    </section>

    {/* Partners Section */}
    <section className="mb-16 bg-black rounded-2xl p-8 sm:p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #F5A623 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.3em]">Proudly Supported By</span>
          <h2 className="text-white text-3xl sm:text-4xl font-black uppercase italic tracking-tighter mt-2">Our Partners</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/WhatsApp Image 2026-02-16 at 6.12.50 PM.jpeg" 
              alt="Partner 1" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/WhatsApp Image 2026-02-16 at 6.12.50 PM (1).jpeg" 
              alt="Partner 2" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/WhatsApp Image 2026-02-16 at 6.12.50 PM (2).jpeg" 
              alt="Partner 3" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button className="border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  </>
);

const AboutPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 animate-in fade-in duration-700 px-4">
    <div className="relative h-[650px] mb-20 overflow-hidden shadow-2xl">
      <img src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Eagles Rugby Club" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center px-12 lg:px-24">
        <h1 className="text-white text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">ONE HEART,<br />ONE VISION</h1>
        <p className="text-gray-200 text-xl font-bold max-w-2xl uppercase tracking-widest border-l-4 border-[#F5A623] pl-6 py-2 bg-black/20 backdrop-blur-sm">A movement built on courage, brotherhood, and an unbreakable will to win.</p>
      </div>
    </div>
    <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-7 space-y-8">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#1a1a1a]">WHO WE ARE</h2>
        <div className="text-lg text-gray-600 font-medium leading-relaxed space-y-6">
          <p>Eagles Rugby Club is more than a team; it is a movement. Founded in 2019, we have rapidly emerged as a rising force in Ugandan rugby, dedicated to excellence on and off the pitch.</p>
          <div className="bg-[#F5A623]/5 p-8 border-l-8 border-[#F5A623]">
            <p className="italic font-bold text-gray-800 text-xl">"Greatness is achieved through unity and discipline."</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 relative group">
        <div className="absolute inset-0 bg-[#F5A623] translate-x-4 translate-y-4 -z-10"></div>
        <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000" className="w-full shadow-xl grayscale hover:grayscale-0 transition-all duration-700" alt="Team Huddle" />
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
      <article id="vision" className="bg-white border-l-8 border-[#F5A623] p-8 shadow-sm scroll-mt-32">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Vision</h3>
        <p className="text-gray-600 font-medium leading-relaxed">
          To be Uganda's most respected rugby institution by developing world-class athletes and leaders grounded in discipline, unity, and integrity.
        </p>
      </article>
      <article id="mission" className="bg-white border-l-8 border-[#F5A623] p-8 shadow-sm scroll-mt-32">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Mission</h3>
        <p className="text-gray-600 font-medium leading-relaxed">
          To provide opportunity for hidden talent through elite training, education, mentorship, and a strong brotherhood culture on and off the field.
        </p>
      </article>
      <article id="core-values" className="bg-white border-l-8 border-[#F5A623] p-8 shadow-sm scroll-mt-32">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Core Values</h3>
        <p className="text-gray-600 font-medium leading-relaxed">
          Discipline, teamwork, responsibility, resilience, and excellence in every session, match, and community touchpoint.
        </p>
      </article>
      <article id="home-ground" className="bg-white border-l-8 border-[#F5A623] p-8 shadow-sm scroll-mt-32">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Home Ground</h3>
        <p className="text-gray-600 font-medium leading-relaxed">
          Kitante Primary School Grounds, Kampala, Uganda, where the club was founded and where the Eagles spirit took flight in 2019.
        </p>
      </article>
    </section>
  </div>
);

const HistoryPage: React.FC = () => (
  <div className="animate-in fade-in duration-700">
    {/* High Impact Hero */}
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=1920" 
        className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-50" 
        alt="History Background" 
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <span className="inline-block bg-[#F5A623] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Established 2019</span>
        <h1 className="text-white text-7xl lg:text-[12rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
          FLIGHT<br /><span className="text-[#F5A623]">PATH</span>
        </h1>
        <div className="max-w-xl border-l-4 border-white pl-8 py-2">
          <p className="text-white/80 text-lg lg:text-2xl font-bold uppercase tracking-wide leading-snug">
            Tracing the journey from a local vision at Kitante to a national movement of brotherhood and resilience.
          </p>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Founder Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F5A623]/10 -z-10 rounded-full blur-3xl"></div>
          <div className="aspect-[4/5] bg-[#1a1a1a] p-4 relative">
             <img 
               src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
               alt="Founder Kampani Arthur" 
             />
             <div className="absolute -bottom-8 -right-8 bg-[#F5A623] text-white p-6 shadow-2xl">
               <p className="text-xs font-black uppercase tracking-widest mb-1">Founder & Visionary</p>
               <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Kampani Arthur</h3>
             </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#1a1a1a] mb-6">THE GENESIS</h2>
          <div className="text-xl text-gray-600 font-medium leading-relaxed space-y-6">
            <p>
              Born at <span className="text-black font-black italic">Kitante Primary School</span>, Eagles Rugby Club was founded by Kampani Arthur to bridge a critical gap: providing a platform for Uganda's hidden upcountry talent.
            </p>
            <p>
              Inspired by his time as captain at Namulango College, Arthur instilled a culture of <span className="text-[#F5A623] font-black">discipline, responsibility, and teamwork</span> that became the club's heartbeat.
            </p>
            <div className="py-6 border-y border-gray-100 italic font-bold text-gray-400 uppercase text-sm tracking-widest">
              "We didn't just want a team; we wanted to give talent a home."
            </div>
          </div>
        </div>
      </section>

      {/* Modern Timeline */}
      <section className="mb-32">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter mb-4">THE CHRONICLES</h2>
          <div className="w-24 h-2 bg-[#F5A623] mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-24">
            {[
              { year: '2019', title: 'Foundation', text: 'Eagles RC takes flight at Kitante, focusing on players with grit but no stage.' },
              { year: 'Season 1', title: 'The Debut', text: 'Finished 4th in Second Division. A statement of intent led by Coach Edmand Tumusiime.' },
              { year: '2023-24', title: 'Invincible Era', text: 'An unbeaten run of absolute dominance leads to Top Division promotion.' },
              { year: '2025', title: 'Eternal Legacy', text: 'The tragic loss of fly-half Ronnie Kayondo. The club regroups, fueled by his fighting spirit.' },
              { year: 'Beyond', title: 'Rising Higher', text: 'Over 200 players developed. Today, we stand as a symbol of Ugandan resilience.' }
            ].map((m, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 px-12 text-center md:text-right">
                  {i % 2 !== 0 && <div className="hidden md:block"></div>}
                  {i % 2 === 0 && (
                    <div className="space-y-3">
                      <span className="text-[#F5A623] text-4xl font-black italic">{m.year}</span>
                      <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900">{m.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-md ml-auto">{m.text}</p>
                    </div>
                  )}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-white border-4 border-[#F5A623] flex items-center justify-center z-10 my-6 md:my-0 shadow-xl">
                  <div className="w-3 h-3 rounded-full bg-[#F5A623]"></div>
                </div>

                <div className="md:w-1/2 px-12 text-center md:text-left">
                  {i % 2 === 0 && <div className="hidden md:block"></div>}
                  {i % 2 !== 0 && (
                    <div className="space-y-3">
                      <span className="text-[#F5A623] text-4xl font-black italic">{m.year}</span>
                      <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900">{m.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-md mr-auto">{m.text}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development & Philosophy Section */}
      <section className="bg-[#1a1a1a] -mx-6 lg:-mx-32 p-16 lg:p-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[50px] border-white/5 rounded-full -mr-64 -mt-64"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-[0.9]">MORE THAN<br />RUGBY.</h2>
              <div className="space-y-6 text-gray-400 font-bold text-lg uppercase tracking-wide leading-relaxed">
                <p>We don't just recruit players; we build professionals. Through mentorship and hard work, we prepare athletes for success in classrooms and boardrooms.</p>
                <p>Since 2019, 200+ players have carried our discipline into the corporate world.</p>
              </div>
            </div>
            <div className="text-center lg:text-right border-l-8 border-[#F5A623] pl-12 lg:pl-0 lg:border-l-0 lg:border-r-8 lg:pr-12">
              <p className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">
                "A WINNING TEAM BEATS WITH<br /><span className="text-[#F5A623]">ONE HEART.</span>"
              </p>
              <button className="bg-white text-black px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#F5A623] hover:text-white transition-all">Support The Vision</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className={`max-w-[1700px] mx-auto ${currentPage === 'history' ? '' : 'px-4 lg:px-12 mt-6'}`}>
        {currentPage === 'home' ? <HomePage onNavigate={setCurrentPage} /> : null}
        {currentPage === 'about' ? <AboutPage /> : null}
        {currentPage === 'history' ? <HistoryPage /> : null}
        
        {['squad', 'shop', 'tv', 'donate', 'contact', 'hall-of-fame', 'fitness-center', 'our-projects', 'our-foundation', 'sponsor-us'].includes(currentPage) && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-300 mb-4">Under Construction</h2>
              <button onClick={() => setCurrentPage('home')} className="bg-[#F5A623] text-white px-6 py-2 font-black uppercase text-[10px] tracking-widest">Return Home</button>
            </div>
          </div>
        )}
      </main>

      <a
        href="https://wa.me/256773207919"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Eagles RFC on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.3 4.94L2 22l5.33-1.39a9.85 9.85 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.82 9.82 0 0 0-2.89-7zm-7.02 15.23h-.01a8.15 8.15 0 0 1-4.15-1.14l-.3-.18-3.16.82.84-3.08-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.5 3.66-8.17 8.17-8.17a8.1 8.1 0 0 1 5.78 2.4 8.12 8.12 0 0 1 2.4 5.77c0 4.5-3.66 8.17-8.16 8.17zm4.48-6.12c-.25-.12-1.48-.73-1.7-.82-.23-.08-.39-.12-.56.13-.16.25-.64.82-.78.99-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.25-.01-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.61.57.25 1.02.4 1.37.51.58.18 1.11.16 1.52.1.46-.07 1.48-.6 1.69-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.16-.48-.28z" />
        </svg>
      </a>

      {/* Premium Sports Footer - Full Width */}
      <footer className="bg-[#0a0a0a] text-white mt-20 w-full relative overflow-hidden">
        {/* Dynamic Sports Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#F5A623" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        
        {/* Angled Gold Accent Bar - Sports Energy */}
        <div className="relative h-2 bg-[#F5A623] transform -skew-y-1 origin-top-left scale-110"></div>
        
        {/* Main Footer Content */}
        <div className="relative z-10">
          {/* Top Stats Bar - Corporate Sports Data */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">200+</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Players Developed</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">5+</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Years of Excellence</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">1</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Vision</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">∞</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Heart & Passion</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Footer Grid */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Brand Column - Larger */}
              <div className="lg:col-span-5">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#F5A623] rounded-lg flex items-center justify-center transform -rotate-6">
                    <span className="text-black text-2xl font-black">E</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Eagles RFC</h3>
                    <p className="text-[#F5A623] text-xs uppercase tracking-widest">Rugby Club</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                  A premier rugby institution built on discipline, brotherhood, and excellence. Developing Uganda's finest talent since 2019.
                </p>
                
                {/* Social Icons - Corporate Style */}
                <div className="flex space-x-3">
                  {['twitter', 'instagram', 'youtube', 'facebook'].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded flex items-center justify-center text-gray-400 hover:bg-[#F5A623] hover:text-black hover:border-[#F5A623] transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        {social === 'twitter' && <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>}
                        {social === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
                        {social === 'youtube' && <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>}
                        {social === 'facebook' && <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Navigation Columns */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {/* Club */}
                  <div>
                    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 border-l-2 border-[#F5A623] pl-3">Club</h4>
                    <ul className="space-y-3">
                      <li><a href="#" onClick={() => setCurrentPage('about')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">About Us</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('history')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">History</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('squad')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Squad</a></li>
                      <li><a href="#" className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Staff</a></li>
                    </ul>
                  </div>
                  
                  {/* Fans */}
                  <div>
                    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 border-l-2 border-[#F5A623] pl-3">Fans</h4>
                    <ul className="space-y-3">
                      <li><a href="#" onClick={() => setCurrentPage('shop')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Shop</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('tv')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Eagles TV</a></li>
                      <li><a href="#" className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Tickets</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('donate')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Donate</a></li>
                    </ul>
                  </div>
                  
                  {/* Contact */}
                  <div>
                    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 border-l-2 border-[#F5A623] pl-3">Contact</h4>
                    <ul className="space-y-3">
                      <li className="text-gray-500 text-sm">Kitante Primary School</li>
                      <li className="text-gray-500 text-sm">Kampala, Uganda</li>
                      <li><a href="mailto:info@eaglesrfc.com" className="text-[#F5A623] text-sm hover:underline">info@eaglesrfc.com</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('contact')} className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">Contact Form</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Legal Bar */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-600 text-xs">© 2025 Eagles Rugby Club. All Rights Reserved.</p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-600 text-xs hover:text-[#F5A623] transition-colors">Privacy Policy</a>
                  <span className="text-gray-700">|</span>
                  <a href="#" className="text-gray-600 text-xs hover:text-[#F5A623] transition-colors">Terms of Use</a>
                  <span className="text-gray-700">|</span>
                  <a href="#" className="text-gray-600 text-xs hover:text-[#F5A623] transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

