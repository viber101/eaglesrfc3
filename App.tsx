
import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Card from './components/Card';
import { MOCK_SHOP_PRODUCTS, MOCK_NEWS, MOCK_STANDINGS, MOCK_PLAYERS, MOCK_TV, MOCK_X_PLAYERS, MOCK_HALL_OF_FAME, MOCK_BUSINESS_ATHLETES } from './constants';
import { castVote as castPollVote, getPollCounts, PollApiConfigError, type PollChoice, type PollCounts } from './lib/pollApi';
import {
  ABOUT_CONTENT,
  CONTACT_INFO,
  DONATE_CONTENT,
  FITNESS_CONTENT,
  FOUNDATION_CONTENT,
  HISTORY_CONTENT,
  HOME_CONTENT,
  PLAYER_SPONSOR_CONTENT,
  PROJECTS_CONTENT,
  SHOP_CONTENT,
  SPONSOR_US_CONTENT,
  TV_CONTENT
} from './content/siteContent';
import type { PurposeItem, SponsorshipTier, ValueItem } from './types';

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
  halfTimeHome?: number;
  halfTimeAway?: number;
  status: string;
};

const POLL_SESSION_VOTE_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-session-vote-v1';
const POLL_SESSION_TOKEN_STORAGE_KEY = 'eagles-vs-golden-badgers-poll-session-token-v1';

const FIXTURE_SCORE_OVERRIDES: Record<string, FixtureScore> = {};
const PLAYER_SPONSORS = [
  {
    id: 'sponsor-1',
    name: 'Kampanis',
    role: 'Club Sponsor',
    imageUrl: '/partners/kampanis.png',
    service: 'Kampanis offers professional shoe repair services at Forest Mall Lugogo. They also have shoe care products for more information call.',
    contact: '+256 775 833 585'
  },
  {
    id: 'sponsor-2',
    name: 'Vacker',
    role: 'Kit Sponsor',
    imageUrl: '/partners/Vacker.jpeg',
    service: 'Vacker provides quality apparel and support products for athletes and active teams.',
    contact: '+256 775 833 585'
  },
  {
    id: 'sponsor-3',
    name: 'Wina Classic',
    role: 'Supporting Sponsor',
    imageUrl: '/partners/Wina Classic.jpeg',
    service: 'Wina Classic supports match-day operations, team coordination, and event partnerships.',
    contact: '+256 775 833 585'
  },
  {
    id: 'sponsor-4',
    name: 'CHINT',
    role: 'Supporting Sponsor',
    imageUrl: '/partners/CHINT.jpeg',
    service: 'CHINT offers dependable electrical and power solutions for organizations and communities.',
    contact: '+256 775 833 585'
  },
  {
    id: 'sponsor-5',
    name: 'Caramec',
    role: 'Official Sponsor',
    imageUrl: '/partners/caramec.png',
    service: 'Caramec delivers practical engineering and project support across sports and community initiatives.',
    contact: '+256 775 833 585'
  }
];
const X_CAPTAINS = [
  { period: '2019-2022', name: 'Regan Kitara' },
  { period: '2022-2023', name: 'Danmark Omeda' },
  { period: '2023-2024', name: 'Ojara Emmanuel' },
  { period: '2024-2025', name: 'Odonkara Emanuel' }
];
const X_CAPTAIN_IMAGES = [
  '/x captains/Regan Kitara.jpeg',
  '/x captains/Danmark Omeda.jpeg',
  '/x captains/Ojara Emmanuel.jpeg',
  '/x captains/Odonkara Emanuel.jpeg'
];
const X_COACHES = [
  { period: '2019-2023', name: 'Edmond Tumusiime' },
  { period: '2023-2025', name: 'Cherokee Sylvain Ngue' }
];
const X_COACH_IMAGES = [
  '/X Coaches/Edmond Tumusiime.jpeg',
  '/X Coaches/Cherokee Sylvain Ngue.webp'
];
const LEGACY_SLIDE_IMAGES = [
  '/gallery/Eagles (1).jpeg',
  '/gallery/Eagles (3).jpeg',
  '/gallery/Eagles (9).jpeg',
  '/gallery/Eagles (14).jpeg',
  '/gallery/Eagles (19).jpeg'
];
const CATEGORY_SPONSORSHIP_TYPES = [
  'Man of the Match Sponsor',
  'Impact Player Sponsor',
  'Pitch Maintenance Sponsor',
  'Flood Light Sponsor',
  'Scoreboard Sponsor',
  'Rugby Balls Sponsor',
  'Scrum Machine Sponsor',
  'Tackle Bags Sponsor',
  'Laundry Service Sponsor',
  'Medical Sponsor',
  'Meals Sponsor'
];
const CATEGORY_SPONSORSHIP_BENEFITS = [
  'Logo on our website',
  'SMS blasting',
  'Social media mentions',
  'Allocation of a brand ambassador',
  'One pitch-side advertising space (3 meters by 4 meters) for your company'
];
const PAGE_IMAGES = {
  aboutHero: '/gallery/Eagles (10).jpeg',
  aboutStory: ['/gallery/Eagles (3).jpeg', '/gallery/Eagles (8).jpeg', '/gallery/Eagles (14).jpeg'],
  historyHero: '/gallery/Eagles (17).jpeg',
  historyMoments: ['/gallery/Eagles (4).jpeg', '/gallery/Eagles (9).jpeg', '/gallery/Eagles (19).jpeg'],
  fitnessHero: '/fitness centre/any.jpeg',
  fitnessSupport: '/fitness centre/paul.jpeg',
  projectsHero: '/gallery/Stands/Stands (1).jpeg',
  projectsGallery: ['/gallery/Stands/Stands (2).jpeg', '/gallery/Stands/Stands (3).jpeg', '/gallery/Stands/Stands (4).jpeg'],
  foundationHero: '/gallery/Education & sports/Education (1).jpeg',
  foundationGallery: ['/gallery/Education & sports/Education (2).jpeg', '/gallery/Education & sports/Education (3).jpeg', '/gallery/Education & sports/Education (4).jpeg'],
  sponsorHero: '/gallery/Eagles (18).jpeg',
  sponsorUsHero: '/kit%20sponsor/kit%20sponsor.jpeg',
  donateHero: '/gallery/Education & sports/Education (12).jpeg',
  playerSponsorHero: '/gallery/Eagles (12).jpeg',
  shopHero: '/gallery/Eagles (6).jpeg',
  tvHero: '/gallery/Eagles (15).jpeg'
};
const toAssetUrl = (path: string) => encodeURI(path);

const cleanCell = (value: string) => value.replace(/"/g, '').replace(/\s+/g, ' ').trim();
const extractDateNumber = (value: string) => value.match(/\d+/)?.[0] ?? value;
const normalizeTeam = (value: string) => cleanCell(value).toLowerCase();
const isEaglesTeam = (value: string) => normalizeTeam(value).includes('eagles');
const toFixtureKey = (fixture: FixtureItem) => `${fixture.week}-${normalizeTeam(fixture.home)}-${normalizeTeam(fixture.away)}`;
const FIXTURE_DATE_SHIFT_DAYS = 6;

const getBaseFixtureDate = (fixture: FixtureItem) => {
  const dateNumber = Number(extractDateNumber(fixture.date));
  if (!Number.isFinite(dateNumber)) {
    return null;
  }
  const parsed = new Date(`${fixture.month} ${dateNumber}, 2026`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getAdjustedFixtureDate = (fixture: FixtureItem) => {
  const baseDate = getBaseFixtureDate(fixture);
  if (!baseDate) {
    return null;
  }
  const shifted = new Date(baseDate);
  shifted.setDate(shifted.getDate() + FIXTURE_DATE_SHIFT_DAYS);
  return shifted;
};

const getFixtureMonthForFilter = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  return adjustedDate
    ? adjustedDate.toLocaleDateString('en-US', { month: 'long' })
    : fixture.month;
};

const toFixtureDateLabel = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  if (adjustedDate) {
    const day = adjustedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const month = adjustedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month} ${adjustedDate.getDate()}`;
  }
  const monthFallback = fixture.month ? fixture.month.slice(0, 3).toUpperCase() : 'TBC';
  const dateNumber = extractDateNumber(fixture.date);
  const dayFallback = fixture.day ? fixture.day.slice(0, 3).toUpperCase() : '';
  return `${dayFallback} ${monthFallback} ${dateNumber}`.trim();
};

const toFixtureMonthDayLabel = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  if (adjustedDate) {
    const month = adjustedDate.toLocaleDateString('en-US', { month: 'long' });
    return `${month} ${adjustedDate.getDate()}`;
  }
  return `${fixture.month} ${extractDateNumber(fixture.date)}`;
};

const toFixtureDayLabel = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  if (adjustedDate) {
    return adjustedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
  return fixture.day;
};

const formatScoreValue = (score?: FixtureScore) => (
  score ? `${score.home} : ${score.away}` : '... : ...'
);
const formatHalfTimeValue = (score?: FixtureScore) => (
  score && typeof score.halfTimeHome === 'number' && typeof score.halfTimeAway === 'number'
    ? `${score.halfTimeHome} : ${score.halfTimeAway}`
    : '... : ...'
);

const MONTH_ORDER = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const MONTH_INDEX: Record<string, number> = MONTH_ORDER.reduce((acc, month, index) => {
  acc[month.toLowerCase()] = index;
  return acc;
}, {} as Record<string, number>);

const getTimeSortValue = (value: string) => {
  const clean = cleanCell(value).toUpperCase();
  const match = clean.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const ampm = match[3];
  if (ampm === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (ampm === 'AM' && hours === 12) {
    hours = 0;
  }
  return (hours * 60) + minutes;
};

const getFixtureKickoffDate = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  if (!adjustedDate) {
    return null;
  }
  const kickoff = new Date(adjustedDate);
  const match = cleanCell(fixture.time).toUpperCase().match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
  if (!match) {
    kickoff.setHours(12, 0, 0, 0);
    return kickoff;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const ampm = match[3];
  if (ampm === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (ampm === 'AM' && hours === 12) {
    hours = 0;
  }
  kickoff.setHours(hours, minutes, 0, 0);
  return kickoff;
};

const toNextMatchDateLabel = (fixture: FixtureItem) => {
  const adjustedDate = getAdjustedFixtureDate(fixture);
  if (!adjustedDate) {
    return `${fixture.day.slice(0, 3)} ${extractDateNumber(fixture.date)}/${fixture.month.slice(0, 3)}`;
  }
  const weekday = adjustedDate.toLocaleDateString('en-US', { weekday: 'short' });
  const day = adjustedDate.getDate().toString().padStart(2, '0');
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
  return `${weekday} ${day}/${month}`;
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

const PlayerSponsorsSlider: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
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
        <h3 className="text-white text-[11px] font-black uppercase tracking-widest">Become a Sponsor</h3>
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
          {PLAYER_SPONSORS.map((sponsor) => (
            <article key={sponsor.id} className="min-w-[270px] snap-start rounded-sm bg-[#e8ecf2] text-black border-t-4 border-[#F5A623] p-4 shadow-sm">
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-[#bdd0e1] text-[#081534] text-[10px] px-2.5 py-1 font-black uppercase tracking-wide">{sponsor.role}</span>
              </div>

              <div className="h-28 rounded-md overflow-hidden bg-white border border-[#d5dde8] flex items-center justify-center p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]">
                <img
                  src={toAssetUrl(sponsor.imageUrl)}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <p className="mt-2 text-xs text-[#2f4364] font-semibold leading-relaxed">{sponsor.service}</p>
              <a
                href="tel:+256775833585"
                className="mt-4 w-full rounded-md border border-black bg-gradient-to-r from-[#F5A623] to-[#f8c75a] text-black py-2 text-[11px] font-black uppercase tracking-wider hover:from-black hover:to-black hover:text-[#F5A623] transition-colors flex items-center justify-center gap-2"
              >
                <span>+256 775 833 585</span>
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarSection: React.FC = () => {
  const [fixtures, setFixtures] = useState<FixtureItem[]>([]);
  const [activeMonths, setActiveMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/fixtures/2026-cura-championship-fixtures.csv')
      .then((response) => response.text())
      .then((csvText) => {
        if (!isMounted) {
          return;
        }

        const parsedFixtures = parseFixturesCsv(csvText);
        const eaglesFixtures = parsedFixtures.filter(
          (fixture) => isEaglesTeam(fixture.home) || isEaglesTeam(fixture.away)
        );

        const sortedFixtures = [...eaglesFixtures].sort((a, b) => {
          const adjustedA = getAdjustedFixtureDate(a);
          const adjustedB = getAdjustedFixtureDate(b);
          if (adjustedA && adjustedB) {
            const dateDelta = adjustedA.getTime() - adjustedB.getTime();
            if (dateDelta !== 0) {
              return dateDelta;
            }
          } else {
            const monthDelta = (MONTH_INDEX[a.month.toLowerCase()] ?? 99) - (MONTH_INDEX[b.month.toLowerCase()] ?? 99);
            if (monthDelta !== 0) {
              return monthDelta;
            }
            const dateDelta = Number(extractDateNumber(a.date)) - Number(extractDateNumber(b.date));
            if (dateDelta !== 0) {
              return dateDelta;
            }
          }
          return getTimeSortValue(a.time) - getTimeSortValue(b.time);
        });

        const availableMonths = Array.from(new Set(sortedFixtures.map((fixture) => getFixtureMonthForFilter(fixture))))
          .sort((a, b) => (MONTH_INDEX[a.toLowerCase()] ?? 99) - (MONTH_INDEX[b.toLowerCase()] ?? 99));
        setFixtures(sortedFixtures);
        setActiveMonths(availableMonths);

        const currentMonth = MONTH_ORDER[new Date().getMonth()];
        if (availableMonths.includes(currentMonth)) {
          setSelectedMonth(currentMonth);
        } else {
          setSelectedMonth(availableMonths[0] || '');
        }
      })
      .catch(() => {
        if (isMounted) {
          setFixtures([]);
          setActiveMonths([]);
          setSelectedMonth('');
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

  const visibleFixtures = selectedMonth
    ? fixtures.filter((fixture) => getFixtureMonthForFilter(fixture).toLowerCase() === selectedMonth.toLowerCase())
    : fixtures;

  const currentMonth = MONTH_ORDER[new Date().getMonth()];
  const isMonthActive = (month: string) => activeMonths.includes(month);

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
  }, [visibleFixtures.length, isLoading, selectedMonth]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-[#081534]">Calendar</h2>
        <div className="hidden sm:flex items-center gap-6 text-[#081534] text-sm font-bold">
          <button className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M6 8h12M9 12h6M10 16h4" /></svg>
            Filters
          </button>
          <button className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" /></svg>
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-[#081534] rounded-full p-1.5 mb-6 overflow-x-auto scrollbar-hide border border-[#F5A623]/40">
        <div className="flex min-w-max">
          {MONTH_ORDER.map((month) => (
            <button
              key={month}
              onClick={() => isMonthActive(month) && setSelectedMonth(month)}
              disabled={!isMonthActive(month)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                selectedMonth === month ? 'bg-[#F5A623] text-black' : 'text-white/80 hover:bg-white/10'
              } ${!isMonthActive(month) ? 'opacity-35 cursor-not-allowed hover:bg-transparent' : ''}`}
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => isMonthActive(currentMonth) && setSelectedMonth(currentMonth)}
          disabled={!isMonthActive(currentMonth)}
          className={`bg-black text-white text-sm font-black px-5 py-2 rounded-full border border-[#F5A623] transition-colors ${
            isMonthActive(currentMonth) ? 'hover:bg-[#F5A623] hover:text-black' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          Go to current month
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 font-bold uppercase text-sm">
          Loading Calendar...
        </div>
      ) : (
        <div className="bg-[#081534] rounded-2xl p-4 sm:p-5 shadow-[0_20px_45px_rgba(8,21,52,0.35)]">
          <div className="relative">
            {canScrollLeft && (
              <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#081534] shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {canScrollRight && (
              <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#081534] shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </button>
            )}

            <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory pb-1">
              {visibleFixtures.map((fixture) => {
                const score = FIXTURE_SCORE_OVERRIDES[toFixtureKey(fixture)];
                return (
                  <article key={`${fixture.id}-${fixture.home}-${fixture.away}`} className="min-w-[320px] sm:min-w-[360px] max-w-[360px] rounded-2xl overflow-hidden bg-white border border-[#d7dbe3] shadow-sm snap-start">
                    <div className="bg-gradient-to-br from-[#0d245b] via-[#0b1d4a] to-[#081538] p-5 text-white border-t-4 border-[#F5A623]">
                      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#b2bdd5] mb-4">
                        <span>{fixture.category}</span>
                        <span>{toFixtureDateLabel(fixture)} {fixture.time}</span>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-3">
                        <p className={`text-sm font-black uppercase leading-tight text-left ${isEaglesTeam(fixture.home) ? 'text-[#F5A623]' : 'text-white'}`}>{fixture.home}</p>
                        <p className="text-3xl font-black text-center">VS</p>
                        <p className={`text-sm font-black uppercase leading-tight text-right ${isEaglesTeam(fixture.away) ? 'text-[#F5A623]' : 'text-white'}`}>{fixture.away}</p>
                      </div>
                    </div>
                    <div className="p-5 bg-[#f7f8fb]">
                      <p className="text-[#1b2f5a] text-xs font-bold mb-2">CURA Championship</p>
                      <h3 className="text-[#0d245b] text-3xl font-black tracking-tight mb-1">Week {fixture.week}</h3>
                      <p className="text-[#0d245b] text-lg font-black mb-3">{toFixtureMonthDayLabel(fixture)}</p>
                      <div className="mb-3 border border-[#d5dbe6] rounded-md bg-white px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wide text-[#4d6185]">Half Time</span>
                        <span className="text-[#0d245b] text-base font-black">{formatHalfTimeValue(score)}</span>
                      </div>
                      <div className="mb-3 border border-[#d5dbe6] rounded-md bg-white px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wide text-[#4d6185]">Full Time</span>
                        <span className="text-[#0d245b] text-base font-black">{formatScoreValue(score)}</span>
                      </div>
                      <div className="space-y-2 text-[#35507f] text-sm font-bold">
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#7788a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" /></svg>
                          {toFixtureDayLabel(fixture)}, {fixture.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#7788a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
                          {fixture.venue}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
              {!visibleFixtures.length && (
                <div className="min-w-[320px] bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 font-bold uppercase text-sm">
                  No fixtures found for this month.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const getCategoryPercentages = (values: PollCounts) => {
  const total = values.win + values.draw + values.loss;
  if (total <= 0) {
    return { win: 0, draw: 0, loss: 0 };
  }
  return {
    win: (values.win / total) * 100,
    draw: (values.draw / total) * 100,
    loss: (values.loss / total) * 100
  };
};

const getBarWidth = (percentage: number, rawCount: number) => {
  if (rawCount <= 0) {
    return 0;
  }
  return Math.max(4, percentage);
};

const MatchPollWidget: React.FC = () => {
  const [counts, setCounts] = useState<PollCounts>({ win: 0, draw: 0, loss: 0 });
  const [selectedChoice, setSelectedChoice] = useState<PollChoice | null>(null);
  const [storageStatus, setStorageStatus] = useState<'ready' | 'blocked'>('ready');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [countsStatus, setCountsStatus] = useState<'loading' | 'live' | 'offline' | 'unconfigured'>('loading');

  const getOrCreateSessionToken = () => {
    try {
      const existingToken = sessionStorage.getItem(POLL_SESSION_TOKEN_STORAGE_KEY);
      if (existingToken) {
        return existingToken;
      }

      const createdToken = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      sessionStorage.setItem(POLL_SESSION_TOKEN_STORAGE_KEY, createdToken);
      return createdToken;
    } catch {
      setStorageStatus('blocked');
      return `volatile-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
  };

  const fetchSharedCounts = async () => {
    try {
      const nextCounts = await getPollCounts();
      setCounts(nextCounts);
      setCountsStatus('live');
    } catch (error) {
      if (error instanceof PollApiConfigError) {
        setCountsStatus('unconfigured');
        return;
      }
      setCountsStatus('offline');
    }
  };

  useEffect(() => {
    try {
      const testKey = '__poll_storage_test__';
      sessionStorage.setItem(testKey, 'ok');
      sessionStorage.removeItem(testKey);
      setStorageStatus('ready');

      const sessionChoice = sessionStorage.getItem(POLL_SESSION_VOTE_STORAGE_KEY) as PollChoice | null;
      if (sessionChoice === 'win' || sessionChoice === 'loss' || sessionChoice === 'draw') {
        setSelectedChoice(sessionChoice);
      }
      getOrCreateSessionToken();
    } catch {
      setCounts({ win: 0, draw: 0, loss: 0 });
      setSelectedChoice(null);
      setStorageStatus('blocked');
    }

    fetchSharedCounts();
    const intervalId = window.setInterval(fetchSharedCounts, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  const totalVotes = counts.win + counts.draw + counts.loss;
  const percentages = getCategoryPercentages(counts);

  const vote = async (choice: PollChoice) => {
    if (selectedChoice) {
      return;
    }

    const nextCounts: PollCounts = {
      ...counts,
      [choice]: counts[choice] + 1
    };
    setCounts(nextCounts);
    setSelectedChoice(choice);
    setSubmitStatus('sending');
    try {
      sessionStorage.setItem(POLL_SESSION_VOTE_STORAGE_KEY, choice);
      setStorageStatus('ready');
    } catch {
      setStorageStatus('blocked');
    }

    try {
      const sessionToken = getOrCreateSessionToken();
      const voteResult = await castPollVote(choice, sessionToken);
      setCounts(voteResult.counts);
      setSubmitStatus('sent');
      window.setTimeout(fetchSharedCounts, 2000);
    } catch (error) {
      if (error instanceof PollApiConfigError) {
        setCountsStatus('unconfigured');
      } else {
        setCountsStatus('offline');
      }
      setSubmitStatus('failed');
    }
  };

  const pollRows: Array<{ key: PollChoice; label: string; value: number; percentage: number }> = [
    { key: 'win', label: 'WIN', value: counts.win, percentage: percentages.win },
    { key: 'draw', label: 'DRAW', value: counts.draw, percentage: percentages.draw },
    { key: 'loss', label: 'LOSS', value: counts.loss, percentage: percentages.loss }
  ];

  const buttonBase = 'border-2 border-black rounded-md py-2 text-xs sm:text-[11px] font-black uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f2e8]';

  return (
    <section className="rounded-xl border-2 border-black bg-[#f6f2e8] text-black p-4 shadow-[4px_4px_0_#000]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Match Poll</h3>
        <p aria-live="polite" className="text-xs font-black uppercase tracking-wide">TOTAL VOTES: {totalVotes}</p>
      </div>

      <p className="text-xs font-black uppercase tracking-wide mb-3"><span className="text-[#F5A623]">Eagles</span> vs Golden Badgers</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => vote('win')}
          disabled={!!selectedChoice}
          aria-pressed={selectedChoice === 'win'}
          className={`${buttonBase} bg-black text-white ${
            selectedChoice === 'win' ? 'ring-2 ring-[#F5A623] scale-[1.02] shadow-[2px_2px_0_#000]' : ''
          } ${selectedChoice ? 'cursor-not-allowed opacity-90' : 'hover:-translate-y-0.5'}`}
        >
          WIN
        </button>
        <button
          onClick={() => vote('draw')}
          disabled={!!selectedChoice}
          aria-pressed={selectedChoice === 'draw'}
          className={`${buttonBase} bg-[#F5A623] text-black ${
            selectedChoice === 'draw' ? 'ring-2 ring-black scale-[1.02] shadow-[2px_2px_0_#000]' : ''
          } ${selectedChoice ? 'cursor-not-allowed opacity-90' : 'hover:-translate-y-0.5'}`}
        >
          DRAW
        </button>
        <button
          onClick={() => vote('loss')}
          disabled={!!selectedChoice}
          aria-pressed={selectedChoice === 'loss'}
          className={`${buttonBase} bg-white text-black ${
            selectedChoice === 'loss' ? 'ring-2 ring-[#F5A623] scale-[1.02] shadow-[2px_2px_0_#000]' : ''
          } ${selectedChoice ? 'cursor-not-allowed opacity-90' : 'hover:-translate-y-0.5'}`}
        >
          LOSS
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {pollRows.map((row) => (
          <div key={row.key} className="flex items-center gap-2">
            <span className="w-14 text-xs font-black uppercase">{row.label}</span>
            <div className="h-5 flex-1 border-2 border-black bg-white overflow-hidden">
              <div
                className="h-full border-r-2 border-black bg-[repeating-linear-gradient(-45deg,#111_0px,#111_6px,#F5A623_6px,#F5A623_12px)] transition-all duration-500"
                style={{ width: `${getBarWidth(row.percentage, row.value)}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-black">{row.value}</span>
          </div>
        ))}
      </div>

      {selectedChoice && (
        <p className="text-[10px] font-black uppercase text-[#1a1a1a]">
          Your vote this session: <span className="text-[#F5A623]">{selectedChoice.toUpperCase()}</span>
        </p>
      )}
      {submitStatus === 'failed' && (
        <p className="text-[10px] font-black uppercase text-[#1a1a1a] mt-1">
          Vote saved locally for this session; sync pending.
        </p>
      )}
      {(countsStatus === 'offline' || countsStatus === 'unconfigured') && (
        <p className="text-[10px] font-black uppercase text-[#1a1a1a] mt-1">
          Live tally unavailable; showing last known totals.
        </p>
      )}
      {storageStatus === 'blocked' && (
        <p className="text-[10px] font-black uppercase text-[#1a1a1a] mt-1">
          Session lock unavailable on this browser.
        </p>
      )}
    </section>
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
  const [nextMatch, setNextMatch] = useState<FixtureItem | null>(null);
  const fallbackMatch: FixtureItem = {
    id: 'fallback-next-match',
    week: '1',
    month: 'February',
    date: '28th',
    day: 'Saturday',
    category: 'Men',
    venue: 'Mukono',
    time: '2:00PM',
    home: 'Life Guard Rams',
    away: 'Eagles RFC'
  };
  const selectedMatch = nextMatch || fallbackMatch;
  const matchKickoff = getFixtureKickoffDate(selectedMatch) ?? new Date('2026-02-28T14:00:00+03:00');
  useEffect(() => {
    let isMounted = true;
    fetch('/fixtures/2026-cura-championship-fixtures.csv')
      .then((response) => response.text())
      .then((csvText) => {
        if (!isMounted) {
          return;
        }
        const parsedFixtures = parseFixturesCsv(csvText).filter(
          (fixture) => isEaglesTeam(fixture.home) || isEaglesTeam(fixture.away)
        );
        const sortedFixtures = [...parsedFixtures].sort((a, b) => {
          const kickoffA = getFixtureKickoffDate(a);
          const kickoffB = getFixtureKickoffDate(b);
          if (kickoffA && kickoffB) {
            return kickoffA.getTime() - kickoffB.getTime();
          }
          return getTimeSortValue(a.time) - getTimeSortValue(b.time);
        });
        const now = new Date();
        const upcoming = sortedFixtures.find((fixture) => {
          const kickoff = getFixtureKickoffDate(fixture);
          return kickoff ? kickoff.getTime() >= now.getTime() : false;
        });
        setNextMatch(upcoming || sortedFixtures[0] || null);
      })
      .catch(() => {
        if (isMounted) {
          setNextMatch(null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
  const displayDate = toNextMatchDateLabel(selectedMatch);
  const displayTime = cleanCell(selectedMatch.time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [matchKickoff]);

  return (
    <div className="bg-transparent backdrop-blur-sm rounded-xl border border-[#F5A623]/30 p-4 sm:p-5 w-full max-w-sm sm:max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Next Match</span>
        <span className="text-white/60 text-[10px] font-medium">Nile Special Rugby</span>
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-white text-sm sm:text-base font-black uppercase text-center leading-tight">{selectedMatch.home}</span>
        </div>

        {/* Match Info */}
        <div className="flex flex-col items-center px-3 sm:px-4">
          <span className="text-[#F5A623] text-xl sm:text-2xl font-black">VS</span>
          <span className="text-white/70 text-[10px]">{displayDate}</span>
          <span className="text-[#F5A623] text-[10px] font-bold">{displayTime}</span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-white text-sm sm:text-base font-black uppercase text-center">{selectedMatch.away}</span>
        </div>
      </div>

      {/* Venue */}
      <div className="text-center mb-3">
        <span className="text-white/50 text-[10px] uppercase tracking-widest">{selectedMatch.venue}</span>
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

const InfoSection: React.FC<{ id?: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="bg-white border border-[#e2e7f0] rounded-xl p-6 sm:p-8 shadow-sm scroll-mt-32">
    <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

const BulletGrid: React.FC<{ items: Array<PurposeItem | ValueItem> }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((item, index) => {
      const heading = 'name' in item ? item.name : item.title;
      return (
        <article key={`${heading}-${index}`} className="bg-white border border-[#e2e7f0] rounded-xl p-5 shadow-sm">
          <h3 className="text-[#081534] text-lg font-black uppercase tracking-tight mb-2">{heading}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </article>
      );
    })}
  </div>
);

const StatTiles: React.FC<{ stats: Array<{ label: string; value: string; description: string }> }> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {stats.map((stat) => (
      <article key={stat.label} className="bg-[#081534] text-white rounded-xl p-5 border-t-4 border-[#F5A623] shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b4c0d9] font-black">{stat.label}</p>
        <p className="text-3xl font-black mt-1">{stat.value}</p>
        <p className="text-sm text-[#d1d9e9] mt-2">{stat.description}</p>
      </article>
    ))}
  </div>
);

const ContactCtaCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="bg-black text-white rounded-xl p-6 border border-[#F5A623]/40">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A623] mb-2">{subtitle}</p>
    <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{title}</h3>
    <p className="text-sm text-gray-300 mb-4">{CONTACT_INFO.name} | {CONTACT_INFO.role}</p>
    <a
      href={CONTACT_INFO.phoneHref}
      className="inline-flex items-center justify-center bg-[#F5A623] text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
    >
      Call {CONTACT_INFO.phone}
    </a>
  </div>
);

const PhotoStrip: React.FC<{ images: string[]; label: string }> = ({ images, label }) => (
  <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {images.map((image, index) => (
      <article key={`${label}-${index}`} className="relative rounded-xl overflow-hidden min-h-[200px] border border-[#d9e0ec]">
        <img src={toAssetUrl(image)} alt={`${label} ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <p className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
      </article>
    ))}
  </section>
);

const TierCard: React.FC<{ tier: SponsorshipTier }> = ({ tier }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white border border-[#d7deea] rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#081534]">{tier.name}</h3>
          <p className="text-[#F5A623] text-xl font-black">{tier.price}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] font-black uppercase tracking-wider border border-[#081534] text-[#081534] rounded-full px-3 py-1 hover:bg-[#081534] hover:text-white transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      <ul className="space-y-2 mb-3">
        {tier.keyInclusions.map((inclusion) => (
          <li key={inclusion} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-[#F5A623] font-black">•</span>
            <span>{inclusion}</span>
          </li>
        ))}
      </ul>

      {expanded && (
        <div className="pt-3 border-t border-[#e2e7f0] space-y-2">
          {tier.benefits.map((benefit) => (
            <p key={benefit} className="text-xs text-gray-600 leading-relaxed">- {benefit}</p>
          ))}
        </div>
      )}
    </article>
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
        <div className="bg-white border border-[#e2e7f0] rounded-xl p-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5A623] font-black mb-2">Club Snapshot</p>
          {HOME_CONTENT.highlights.map((line) => (
            <p key={line} className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">{line}</p>
          ))}
        </div>
        <StandingsWidget />
        <MatchPollWidget />
        <PlayerSponsorsSlider onNavigate={onNavigate} />
      </div>
    </section>

    <CalendarSection />

    <Carousel title="Current Squad 2026">
      {MOCK_PLAYERS.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{p.position}</p>
          <button
            onClick={() => onNavigate('contact')}
            className="mt-3 w-full bg-[#F5A623] text-black py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Sponsor Player
          </button>
        </div>
      ))}
    </Carousel>

    <Carousel title="Ex Players">
      {MOCK_X_PLAYERS.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : null}
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{p.currentClub}</p>
        </div>
      ))}
    </Carousel>

    <Carousel title="Hall of Fame">
      {MOCK_HALL_OF_FAME.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{p.title}</p>
        </div>
      ))}
    </Carousel>

    <Carousel title="Our Athletes in Business">
      {MOCK_BUSINESS_ATHLETES.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{p.title}</p>
          <a
            href={CONTACT_INFO.phoneHref}
            className="mt-3 w-full bg-[#F5A623] text-black py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-center block"
          >
            Contact Player
          </a>
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
            <p>Founded in 2019 by Arthur Kampani at Kitante Primary School.</p>
            <p>From unbeaten promotion runs to building a family of over 200 athletes, we fly as one heart.</p>
            <button onClick={() => onNavigate('history')} className="text-[#F5A623] font-black uppercase text-sm tracking-widest border-b-2 border-[#F5A623] pb-1 hover:text-black hover:border-black transition-all">Explore Full History</button>
          </div>
        </div>
      </div>
    </section>

    <Carousel title="X Captains">
      {X_CAPTAINS.map((item, index) => (
        <div key={`${item.period}-${item.name}`} className="flex-none w-[260px] snap-start">
          <article className="relative h-[360px] overflow-hidden border border-[#cfd8e6]">
            <img
              src={toAssetUrl(X_CAPTAIN_IMAGES[index % X_CAPTAIN_IMAGES.length])}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute top-3 left-3 text-white/80 text-5xl font-black leading-none">{index + 1}</span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-[0.2em]">{item.period}</p>
              <p className="text-white text-base font-black uppercase tracking-tight">{item.name}</p>
            </div>
          </article>
        </div>
      ))}
    </Carousel>

    <Carousel title="X Coaches">
      {X_COACHES.map((item, index) => (
        <div key={`${item.period}-${item.name}`} className="flex-none w-[260px] snap-start">
          <article className="relative h-[360px] overflow-hidden border border-[#cfd8e6]">
            <img
              src={toAssetUrl(X_COACH_IMAGES[index % X_COACH_IMAGES.length])}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute top-3 left-3 text-white/80 text-5xl font-black leading-none">{index + 1}</span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-[0.2em]">{item.period}</p>
              <p className="text-white text-base font-black uppercase tracking-tight">{item.name}</p>
            </div>
          </article>
        </div>
      ))}
    </Carousel>

    {/* Shop Section */}
    <section className="mb-16">
      <SectionHeader title="Official Shop" />
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {MOCK_SHOP_PRODUCTS.filter((product) => product.name !== 'Eagles Membership Card').map((product) => (
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
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
        {MOCK_TV.map((tv) => (
          <a
            key={tv.id}
            href={tv.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer flex-none w-[260px] sm:w-[300px] snap-start"
          >
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
          </a>
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
          <span className="text-[#F5A623] text-xs font-black uppercase tracking-[0.3em]">Proudly Sponsored By</span>
          <h2 className="text-white text-3xl sm:text-4xl font-black uppercase italic tracking-tighter mt-2">Our Partners</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/kampanis.png" 
              alt="Kampanis" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/Vacker.jpeg" 
              alt="Vacker" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/Wina Classic.jpeg" 
              alt="Wina Classic" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/CHINT.jpeg" 
              alt="CHINT" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer group">
            <img 
              src="/partners/caramec.png" 
              alt="Caramec" 
              className="h-16 sm:h-20 w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all"
            />
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('sponsor-us')}
            className="border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </section>

    <section className="mb-16">
      <SectionHeader title="Why Support Eagles" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HOME_CONTENT.whySupport.map((item) => (
          <article key={item.title} className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
            <h3 className="text-[#081534] text-xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  </>
);

const AboutPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 animate-in fade-in duration-700 px-4 space-y-8">
    <section className="relative rounded-2xl overflow-hidden border border-[#d9e0ec]">
      <img src={toAssetUrl(PAGE_IMAGES.aboutHero)} className="w-full h-[420px] object-cover" alt="Eagles Rugby Club" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent p-8 sm:p-12 flex flex-col justify-end">
        <p className="text-[#F5A623] text-xs uppercase tracking-[0.3em] font-black mb-2">About Eagles Rugby Club</p>
        <h1 className="text-white text-4xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none mb-3">Founded 2019</h1>
        <p className="text-white/90 max-w-3xl text-sm sm:text-base leading-relaxed">{ABOUT_CONTENT.overview.summary}</p>
      </div>
    </section>

    <InfoSection title={ABOUT_CONTENT.overview.title}>
      {ABOUT_CONTENT.overview.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </InfoSection>

    <PhotoStrip images={PAGE_IMAGES.aboutStory} label="Club Story" />

    <section>
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Our Purpose</h2>
      <BulletGrid items={ABOUT_CONTENT.purpose} />
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoSection id="vision" title="Vision">
        <p>{ABOUT_CONTENT.vision}</p>
      </InfoSection>
      <InfoSection id="mission" title="Mission">
        <p>{ABOUT_CONTENT.mission}</p>
      </InfoSection>
    </div>

    <section id="core-values" className="scroll-mt-32">
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Core Values</h2>
      <BulletGrid items={ABOUT_CONTENT.coreValues} />
    </section>

    <InfoSection id="home-ground" title="Home Ground">
      <p>{ABOUT_CONTENT.homeGround}</p>
    </InfoSection>

    <InfoSection title="Commitment to Sustainable Growth">
      {ABOUT_CONTENT.growthCommitments.map((item) => (
        <p key={item}>- {item}</p>
      ))}
    </InfoSection>
  </div>
);

const HistoryPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative text-white rounded-2xl p-8 sm:p-12 border-t-4 border-[#F5A623] overflow-hidden">
      <img src={toAssetUrl(PAGE_IMAGES.historyHero)} alt="Eagles history" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/75" />
      <div className="relative z-10">
        <p className="text-[#F5A623] text-xs uppercase tracking-[0.3em] font-black mb-2">Our Journey</p>
        <h1 className="text-5xl sm:text-6xl font-black uppercase italic tracking-tighter mb-4">History</h1>
        <p className="text-[#d4deef] max-w-4xl leading-relaxed">{HISTORY_CONTENT.intro}</p>
      </div>
    </section>

    <section className="space-y-4">
      {HISTORY_CONTENT.milestones.map((milestone) => (
        <article key={milestone.year} className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#F5A623] text-black text-xs font-black uppercase tracking-widest px-2 py-1 rounded">{milestone.year}</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#081534]">{milestone.title}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
        </article>
      ))}
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoSection title="How Eagles Has Grown">
        <p>
          Since foundation, Eagles has evolved from a local rugby setup into a structured club with clearer coaching systems,
          stronger player development pathways, and improving standards for preparation, discipline, and match performance.
        </p>
        <p>
          The club has expanded its leadership structure, strengthened partnerships, and improved planning around welfare, equipment,
          and long-term sustainability.
        </p>
      </InfoSection>
      <InfoSection title="Community and Education Impact">
        <p>
          Eagles Rugby Club uses sport as a platform for broader impact by supporting youth mentorship and helping children from
          struggling families remain in school.
        </p>
        <p>
          This integration of rugby and social responsibility remains a core part of the club identity and long-term mission.
        </p>
      </InfoSection>
    </div>

    <InfoSection title="Legacy">
      <p>{HISTORY_CONTENT.closing}</p>
    </InfoSection>

    <PhotoStrip images={PAGE_IMAGES.historyMoments} label="History Moments" />
  </div>
);

const SquadPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700">
    <SectionHeader title="2026 Players" />
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {MOCK_PLAYERS.map((player) => (
        <article key={player.id} className="bg-white border border-[#e2e7f0] rounded-xl p-3 shadow-sm">
          <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 mb-3">
            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight">{player.name}</h3>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{player.position}</p>
        </article>
      ))}
    </div>
  </div>
);

const HallOfFamePage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700">
    <section>
      <SectionHeader title="Hall of Fame" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MOCK_HALL_OF_FAME.map((member) => (
          <article key={member.id} className="bg-white border border-[#e2e7f0] rounded-xl p-3 shadow-sm">
            <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 mb-3">
              <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-tight">{member.name}</h3>
          </article>
        ))}
      </div>
    </section>
  </div>
);

const ShopPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-6">
    <section className="bg-white border border-[#e2e7f0] rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2 text-[#081534]">Official Shop</h1>
        <p className="text-gray-600">{SHOP_CONTENT.intro}</p>
      </div>
      <div className="h-48 rounded-lg overflow-hidden border border-[#d7deea]">
        <img src={toAssetUrl(PAGE_IMAGES.shopHero)} alt="Shop hero" className="w-full h-full object-cover" />
      </div>
    </section>
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      {MOCK_SHOP_PRODUCTS.filter((product) => product.name !== 'Eagles Membership Card').map((product) => (
        <article key={product.id} className="bg-white border border-[#e2e7f0] rounded-xl p-4 shadow-sm">
          <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-3 rounded">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xs font-bold uppercase text-gray-900 leading-tight">{product.name}</h3>
          <p className="text-[#F5A623] text-sm font-black mt-1">{product.price}</p>
        </article>
      ))}
    </div>
  </div>
);

const TvPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-6">
    <section className="relative rounded-xl overflow-hidden border border-[#e2e7f0] min-h-[240px]">
      <img src={toAssetUrl(PAGE_IMAGES.tvHero)} alt="Eagles TV hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20 p-6 flex flex-col justify-end">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2 text-white">Eagles TV</h1>
        <p className="text-gray-200 max-w-2xl">{TV_CONTENT.intro}</p>
      </div>
    </section>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {MOCK_TV.map((tv) => (
        <a
          key={tv.id}
          href={tv.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer"
        >
          <div className="relative aspect-video overflow-hidden bg-gray-200 mb-2 rounded-lg">
            <img src={tv.imageUrl} alt={tv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center text-black">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 font-bold">{tv.duration}</span>
          </div>
          <h3 className="text-xs font-bold uppercase text-gray-900 leading-tight">{tv.title}</h3>
        </a>
      ))}
    </div>
  </div>
);

const DonatePage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-6">
    <section className="relative text-white rounded-xl p-8 border-t-4 border-[#F5A623] overflow-hidden">
      <img src={toAssetUrl(PAGE_IMAGES.donateHero)} alt="Donate hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/75" />
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-3">Donate</h1>
        <p className="text-[#d4deef] max-w-3xl">{DONATE_CONTENT.intro}</p>
      </div>
    </section>

    <BulletGrid items={DONATE_CONTENT.allocation} />
    <section className="bg-white border border-[#e2e7f0] rounded-xl p-8 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d6185] mb-2">Make an Impact</p>
      <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Support a Child. Support a Player.</h2>
      <a
        href="https://tip.vanvaa.com/?q=MTcxMg=="
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-[#F5A623] text-black px-7 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black hover:text-[#F5A623] transition-colors"
      >
        Donate Now
      </a>
    </section>
  </div>
);

const PlayerSponsorPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative rounded-2xl overflow-hidden border border-[#d9e0ec] bg-[#081534]">
      <img src={toAssetUrl(PAGE_IMAGES.playerSponsorHero)} alt="Player sponsor" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081534]/95 via-[#081534]/80 to-[#081534]/45" />
      <div className="relative z-10 p-8 sm:p-10">
        <p className="text-[#F5A623] text-xs font-black uppercase tracking-[0.28em] mb-2">Sponsor a Player</p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-3 text-white">Player Sponsor</h1>
        <p className="text-[#dbe4f2] max-w-3xl leading-relaxed mb-6">{PLAYER_SPONSOR_CONTENT.offer}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
          <article className="rounded-lg border border-white/20 bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#F5A623] font-black">Package</p>
            <p className="text-white font-black">Monthly</p>
          </article>
          <article className="rounded-lg border border-white/20 bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#F5A623] font-black">Value</p>
            <p className="text-white font-black">UGX 200,000</p>
          </article>
          <article className="rounded-lg border border-white/20 bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#F5A623] font-black">Impact</p>
            <p className="text-white font-black">Direct Player Support</p>
          </article>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <article className="rounded-xl overflow-hidden border border-[#dce3ef] bg-white">
        <img src="/fitness centre/any.jpeg" alt="Tyre strength action" className="w-full h-56 object-cover" />
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#4d6185]">Action Image 01</p>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#081534] mt-1">Strength and Conditioning</h3>
        </div>
      </article>
      <article className="rounded-xl overflow-hidden border border-[#dce3ef] bg-white">
        <img src="/fitness centre/jasper.jpeg" alt="Sprint training action" className="w-full h-56 object-cover" />
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#4d6185]">Action Image 02</p>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#081534] mt-1">Speed and Agility</h3>
        </div>
      </article>
      <article className="rounded-xl overflow-hidden border border-[#dce3ef] bg-white">
        <img src="/fitness centre/griffin.jpeg" alt="Team training action" className="w-full h-56 object-cover" />
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#4d6185]">Action Image 03</p>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#081534] mt-1">Team Match Preparation</h3>
        </div>
      </article>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <article className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">What Your Sponsorship Supports</h2>
        <div className="space-y-2">
          {PLAYER_SPONSOR_CONTENT.supports.map((item) => (
            <p key={item} className="text-sm text-gray-700 font-semibold">- {item}</p>
          ))}
        </div>
      </article>
      <article className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Why Sponsor a Player</h2>
        <div className="space-y-3">
          {PLAYER_SPONSOR_CONTENT.reasons.map((reason) => (
            <article key={reason} className="rounded-lg border border-[#e2e7f0] p-4 text-sm text-gray-700 bg-[#f8fafd]">{reason}</article>
          ))}
        </div>
      </article>
    </section>

    <ContactCtaCard title="Start a Player Sponsorship" subtitle="UGX 200,000 Monthly" />
  </div>
);

const FitnessCenterPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative rounded-2xl overflow-hidden border border-[#d9e0ec] bg-[#081534]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.2),transparent_45%)]" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-[#F5A623] text-xs font-black uppercase tracking-[0.25em] mb-2">Eagles Performance</p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter text-white mb-3">Fitness Center</h1>
          <p className="text-[#dbe4f2] max-w-2xl leading-relaxed mb-4">{FITNESS_CONTENT.intro}</p>
          <div className="inline-flex items-center gap-2 bg-[#F5A623] text-black rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" /></svg>
            <span>{FITNESS_CONTENT.schedule}</span>
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-3">
          <article className="col-span-2 rounded-xl overflow-hidden border border-white/15 bg-black/15 h-[320px]">
            <img src={toAssetUrl('/fitness centre/any.jpeg')} alt="Athlete carrying tyres" className="w-full h-full object-contain object-center bg-black/20" />
          </article>
          <article className="rounded-xl overflow-hidden border border-white/15 bg-black/15 h-[150px]">
            <img src={toAssetUrl('/fitness centre/jasper.jpeg')} alt="Speed drill" className="w-full h-full object-cover" />
          </article>
          <article className="rounded-xl overflow-hidden border border-white/15 bg-black/15 h-[150px]">
            <img src={toAssetUrl('/fitness centre/griffin.jpeg')} alt="Team fitness drill" className="w-full h-full object-cover" />
          </article>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <article className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#081534] mb-3">Pricing and Access</h2>
        <div className="space-y-2">
          {FITNESS_CONTENT.pricing.map((item) => (
            <p key={item} className="text-sm text-gray-700 font-semibold">- {item}</p>
          ))}
        </div>
      </article>
      <article className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#081534] mb-3">Program Benefits</h2>
        <div className="space-y-2">
          {FITNESS_CONTENT.benefits.map((item) => (
            <p key={item} className="text-sm text-gray-700 font-semibold">- {item}</p>
          ))}
        </div>
      </article>
    </section>

    <section className="bg-white border border-[#e2e7f0] rounded-xl p-6 shadow-sm">
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Where Session Fees Go</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FITNESS_CONTENT.feeUse.map((item) => (
          <article key={item} className="bg-[#f6f8fb] border border-[#dce3ef] rounded-lg p-4 text-sm text-gray-700 font-semibold">
            {item}
          </article>
        ))}
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <article className="rounded-xl overflow-hidden border border-[#dce3ef] h-[260px]">
        <img src={toAssetUrl('/fitness centre/paul.jpeg')} alt="Tyre strength training" className="w-full h-full object-contain bg-[#0b1020]" />
      </article>
      <article className="rounded-xl overflow-hidden border border-[#dce3ef] h-[260px]">
        <img src={toAssetUrl('/fitness centre/griffin.jpeg')} alt="Team conditioning" className="w-full h-full object-cover" />
      </article>
    </section>

    <ContactCtaCard title="Register for Fitness Sessions" subtitle="UGX 20,000 Per Session" />
  </div>
);

const ProjectsPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-6">
    <section className="relative text-white rounded-xl p-8 border-t-4 border-[#F5A623] overflow-hidden">
      <img src={toAssetUrl(PAGE_IMAGES.projectsHero)} alt="Stands project" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/75" />
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-3">Our Projects</h1>
        {PROJECTS_CONTENT.summary.map((line) => (
          <p key={line} className="text-[#d4deef] max-w-4xl mb-2 last:mb-0">{line}</p>
        ))}
      </div>
    </section>

    <StatTiles stats={PROJECTS_CONTENT.stats} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoSection title="Why This Project Matters">
        {PROJECTS_CONTENT.whyItMatters.map((item) => (
          <p key={item}>- {item}</p>
        ))}
      </InfoSection>
      <InfoSection title="How You Can Support">
        {PROJECTS_CONTENT.supportOptions.map((item) => (
          <p key={item}>- {item}</p>
        ))}
      </InfoSection>
    </div>

    <PhotoStrip images={PAGE_IMAGES.projectsGallery} label="Stands Project" />

    <ContactCtaCard title="Pledge Support for Stand Construction" subtitle="Infrastructure Sponsorship" />
  </div>
);

const FoundationPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-6">
    <section className="relative rounded-xl overflow-hidden border border-[#e2e7f0] min-h-[300px]">
      <img src={toAssetUrl(PAGE_IMAGES.foundationHero)} alt="Foundation hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20 p-8 flex flex-col justify-end">
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-2 text-white">Our Foundation</h1>
        <p className="text-gray-200 max-w-3xl">{FOUNDATION_CONTENT.mission}</p>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FOUNDATION_CONTENT.impacts.map((impact) => (
        <article key={impact.title} className="bg-white border border-[#e2e7f0] rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#081534] mb-2">{impact.title}</h2>
          <p className="text-sm text-gray-600">{impact.description}</p>
        </article>
      ))}
    </div>

    <InfoSection title="Partnership">
      <p>{FOUNDATION_CONTENT.partnership}</p>
    </InfoSection>
    <PhotoStrip images={PAGE_IMAGES.foundationGallery} label="Foundation Impact" />
    <ContactCtaCard title="Partner With Eagles Foundation" subtitle="Education and Opportunity" />
  </div>
);

const SponsorUsPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative text-white rounded-xl p-8 border-t-4 border-[#F5A623] overflow-hidden">
      <img src={toAssetUrl(PAGE_IMAGES.sponsorUsHero)} alt="Sponsor hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/70" />
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-3">Sponsor Us</h1>
        <p className="text-[#d4deef] max-w-4xl">
          Sponsoring Eagles Rugby Club is a strategic way to drive brand visibility while investing in youth development and community progress.
        </p>
      </div>
    </section>

    <section className="bg-white border border-[#e2e7f0] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-3">Eagles Shirt Branding</h2>
        <p className="text-gray-700 mb-4">See the official Eagles shirt and available branding space options for sponsors.</p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>- Front Chest Naming Space</p>
          <p>- Left/Right Chest Logo Space</p>
          <p>- Sleeve Branding Space</p>
          <p>- Back Number Area Branding</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border border-[#d7deea]">
        <img src="/kit sponsor/kit sponsor.jpeg" alt="Eagles shirt sponsorship spaces" className="w-full h-[360px] object-contain bg-[#0b1020]" />
      </div>
    </section>

    <section>
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Business Value</h2>
      <BulletGrid items={SPONSOR_US_CONTENT.businessCase} />
    </section>

    <section>
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Why We Need Sponsorship</h2>
      <BulletGrid items={SPONSOR_US_CONTENT.sponsorshipNeeds} />
    </section>

    <section>
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Sponsorship Packages (USD)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPONSOR_US_CONTENT.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>

    <InfoSection title="How Sponsorship Funds Are Utilized">
      {SPONSOR_US_CONTENT.utilization.map((item) => (
        <p key={item}>- {item}</p>
      ))}
    </InfoSection>

    <InfoSection title="Category Sponsorship Concept (UGX 2,500,000 Per Year)">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534]">1. Background</h3>
      <p>
        Eagles Rugby Club is a structured, community-driven rugby institution committed to youth development,
        education support, and competitive excellence. The club integrates sport with social responsibility,
        including initiatives that assist children from struggling families to remain in school.
      </p>
      <p>
        To strengthen operational sustainability and enhance brand partnerships, Eagles Rugby Club has developed
        a Category Sponsorship Concept that allows companies and individuals to sponsor specific functional areas
        of the club at a value of UGX 2,500,000 per year per category.
      </p>

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">2. Sponsorship Concept Overview</h3>
      <p>This concept is designed to provide clear branding alignment opportunities, measurable marketing value, support specific operational needs, and deliver professional sponsor recognition.</p>

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">3. Available Sponsorship Categories</h3>
      <p>Each category is available at UGX 2,500,000 per year:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {CATEGORY_SPONSORSHIP_TYPES.map((item) => (
          <p key={item}>- {item}</p>
        ))}
      </div>

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">4. Sponsorship Benefits</h3>
      {CATEGORY_SPONSORSHIP_BENEFITS.map((item) => (
        <p key={item}>- {item}</p>
      ))}

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">5. Value Proposition for Sponsors</h3>
      <p><strong>Brand Visibility:</strong> consistent exposure during match days, online engagement, and club communications.</p>
      <p><strong>Corporate Social Responsibility:</strong> visible commitment to youth empowerment, sport development, and education support.</p>
      <p><strong>Direct Community Impact:</strong> sponsorship supports equipment procurement, facility maintenance, player welfare, medical preparedness, training environments, and education initiatives.</p>
      <p><strong>Targeted Audience Engagement:</strong> connect with players, families, supporters, and the broader community.</p>

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">6. Strategic Impact</h3>
      <p>
        This sponsorship model ensures operational sustainability for Eagles Rugby Club, structured branding opportunities
        for partners, improved player performance infrastructure, and long-term community development.
      </p>

      <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mt-4">7. Conclusion</h3>
      <p>
        The Eagles Rugby Club Category Sponsorship Concept is built on professionalism, accountability, and measurable impact.
        An annual commitment of UGX 2,500,000 per category positions your organization as a visible and responsible partner
        in a growing and community-focused sports institution.
      </p>
      <p className="font-black uppercase tracking-wider text-[#081534]">Empower Sport. Strengthen Community. Elevate Your Brand.</p>
    </InfoSection>

    <ContactCtaCard title="Discuss a Sponsorship Package" subtitle="Corporate and Individual Partners" />
  </div>
);

const ServiceImageCard: React.FC<{
  title: string;
  subtitle: string;
  imageUrl: string;
  fallbackImageUrl: string;
  badge: string;
}> = ({ title, subtitle, imageUrl, fallbackImageUrl, badge }) => {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <article className="rounded-xl overflow-hidden border border-[#e2e7f0] bg-white">
      <div className="relative h-44 bg-gradient-to-br from-[#0f224f] via-[#081534] to-[#1d3c85]">
        <img
          src={useFallback ? fallbackImageUrl : imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
          onError={() => setUseFallback(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <span className="absolute top-3 right-3 bg-[#F5A623] text-black text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#4d6185]">{title}</p>
        <p className="text-sm font-bold text-[#081534] mt-1">{subtitle}</p>
      </div>
    </article>
  );
};

const OtherServicesPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative text-white rounded-xl p-8 border-t-4 border-[#F5A623] overflow-hidden">
      <img src="/other%20services/web%20design.png" alt="Other services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/80" />
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-3">Other Services</h1>
        <p className="text-[#d4deef] max-w-4xl">
          Eagles Rugby Club offers professional digital services as part of our sustainability and innovation strategy.
        </p>
      </div>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ServiceImageCard
        title="Web Services"
        subtitle="Modern websites for organizations and businesses."
        imageUrl="/other%20services/web%20design.png"
        fallbackImageUrl="/other%20services/web%20design.png"
        badge="Web"
      />
      <ServiceImageCard
        title="App Development"
        subtitle="Scalable Android, iOS, and cross-platform solutions."
        imageUrl="/other%20services/app%20development.png"
        fallbackImageUrl="/other%20services/app%20development.png"
        badge="App"
      />
      <ServiceImageCard
        title="SMS Marketing"
        subtitle="Bulk SMS campaigns with targeted communication."
        imageUrl="/other%20services/sms%20marketing.png"
        fallbackImageUrl="/other%20services/sms%20marketing.png"
        badge="SMS"
      />
      <ServiceImageCard
        title="Poster Design"
        subtitle="Professional poster designs for promotions and events."
        imageUrl="/other%20services/poster%20design.png"
        fallbackImageUrl="/other%20services/poster%20design.png"
        badge="Design"
      />
    </section>

    <InfoSection title="Eagles Rugby Club - Web Design Services">
      <p>We offer professional web design services for businesses, schools, NGOs, and sports organizations, delivering modern, functional, and results-driven websites.</p>
      <p><strong>Services include:</strong> Corporate/business websites, school websites, NGO/community websites, e-commerce platforms, sports/event websites, redesign/modernization, maintenance/support, and domain/hosting guidance.</p>
      <p><strong>Why choose us:</strong> responsive design, affordable pricing, tailored solutions, and ongoing support.</p>
    </InfoSection>

    <InfoSection title="Eagles Rugby Club - App Development Services">
      <p>We provide Android, iOS, cross-platform, and custom enterprise app development for practical, scalable digital transformation.</p>
      <p><strong>Services include:</strong> business apps, school management systems, sports club management apps, e-commerce apps, and maintenance/upgrades.</p>
      <p><strong>Why choose us:</strong> scalable solutions, user-centered design, affordable pricing, and reliable technical support.</p>
    </InfoSection>

    <InfoSection title="Eagles Rugby Club - SMS Marketing Services">
      <p>We deliver professional SMS campaigns for businesses, schools, NGOs, and organizations with direct, high-engagement communication.</p>
      <p><strong>Services include:</strong> bulk SMS campaigns, promotions, event reminders, school alerts, product announcements, customer engagement, awareness messaging, and full campaign management.</p>
      <p><strong>Why choose us:</strong> instant delivery, wide reach, cost-effective campaigns, targeted communication, and strategy support.</p>
    </InfoSection>

    <InfoSection title="Poster Design Service">
      <p>
        Eagles Rugby Club offers professional poster design services for organizations and individuals at
        <strong> UGX 50,000 per poster</strong>.
      </p>
      <p>
        <strong>Benefits:</strong> professionally designed posters to organizations and individuals for campaigns,
        product promotions, school communication, event publicity, and social media awareness.
      </p>
    </InfoSection>

    <InfoSection title="Social Impact Through Your Project">
      <p>
        Choosing Eagles Rugby Club digital services supports player development, club operations, equipment and infrastructure,
        and education support for children from struggling families.
      </p>
      <p className="font-black uppercase tracking-wider text-[#081534]">Building Websites. Building Youth. Building the Future.</p>
      <p className="font-black uppercase tracking-wider text-[#081534]">Innovating Digitally. Empowering Socially. Building the Future.</p>
      <p className="font-black uppercase tracking-wider text-[#081534]">Reach Faster. Market Smarter. Empower Stronger.</p>
    </InfoSection>

    <ContactCtaCard title="Request a Service Quote" subtitle="Web, App and SMS Solutions" />
  </div>
);

const MembershipPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700 space-y-8">
    <section className="relative text-white rounded-xl p-8 border-t-4 border-[#F5A623] overflow-hidden">
      <img src={toAssetUrl(PAGE_IMAGES.sponsorHero)} alt="Eagles membership" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#081534]/80" />
      <div className="relative z-10">
        <p className="text-[#F5A623] text-xs uppercase tracking-[0.3em] font-black mb-2">Eagles Rugby Club</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-3">Investor Membership Card</h1>
        <p className="text-[#d4deef] max-w-4xl">
          The Eagles Rugby Club Annual Membership Card is a strategic investment in sport, youth development, and community progress.
        </p>
      </div>
    </section>

    <InfoSection title="Annual Membership">
      <p>
        For <strong>UGX 100,000 per year</strong>, members receive exclusive benefits while directly supporting
        sustainable club growth and social impact programs.
      </p>
    </InfoSection>

    <section>
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534] mb-4">Exclusive Member Benefits</h2>
      <BulletGrid
        items={[
          { name: 'Program Discounts', description: 'Up to 20% discount on selected club programs and activities.' },
          { name: 'Fitness Centre Savings', description: '20% discount every time you train at our Fitness Centre.' },
          { name: 'Priority Access', description: 'Priority access to club events and initiatives.' },
          { name: 'Official Recognition', description: 'Recognition as a valued club supporter and partner.' },
          { name: 'Affordable Training', description: 'Every visit to our fitness centre becomes more affordable within a structured and professionally guided environment.' }
        ]}
      />
    </section>

    <section className="bg-white border border-[#e2e7f0] rounded-xl p-6 space-y-5">
      <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-[#081534]">Why This Membership Is a Valuable Investment</h2>
      <article>
        <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mb-2">1. Direct Financial Advantage</h3>
        <p className="text-gray-700">
          Frequent use of our fitness centre and programs allows members to recover significant value through the 20% discount benefit.
        </p>
      </article>
      <article>
        <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mb-2">2. Sustainable Club Operations</h3>
        <p className="text-gray-700 mb-2">Membership contributions help cover:</p>
        <BulletGrid
          items={[
            { name: 'Equipment', description: 'Equipment maintenance and upgrades.' },
            { name: 'Facilities', description: 'Facility management and utilities.' },
            { name: 'Coaching', description: 'Coaching and program development.' },
            { name: 'Operations', description: 'Administrative and operational costs.' }
          ]}
        />
        <p className="text-gray-700 mt-2">Your support ensures professionalism, safety, and continuous improvement.</p>
      </article>
      <article>
        <h3 className="text-sm font-black uppercase tracking-wider text-[#081534] mb-2">3. Education and Community Impact</h3>
        <p className="text-gray-700">
          A portion of membership proceeds contributes to maintaining children in school and assisting families facing financial challenges.
          Your membership supports both sport and long-term youth empowerment.
        </p>
      </article>
    </section>

    <InfoSection title="A Partnership with Purpose">
      <BulletGrid
        items={[
          { name: 'Personal Fitness', description: 'Investing in your personal fitness.' },
          { name: 'Youth Development', description: 'Supporting youth development.' },
          { name: 'Education Access', description: 'Promoting education access.' },
          { name: 'Community Strength', description: 'Strengthening a growing community institution.' }
        ]}
      />
      <p className="mt-4">
        The Eagles Rugby Club Membership Card represents value, responsibility, and meaningful impact.
      </p>
      <p className="mt-2 font-black uppercase tracking-wider text-[#081534]">Train Smarter. Support Stronger. Build the Future.</p>
    </InfoSection>

    <section className="bg-white border border-[#e2e7f0] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d6185] mb-1">Registration and Partnership Inquiries</p>
        <p className="text-xl font-black text-[#081534]">+256 773 207 919</p>
      </div>
      <a
        href="https://wa.me/256773207919"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#1fa855] transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.3 4.94L2 22l5.33-1.39a9.85 9.85 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.82 9.82 0 0 0-2.89-7zm-7.02 15.23h-.01a8.15 8.15 0 0 1-4.15-1.14l-.3-.18-3.16.82.84-3.08-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.5 3.66-8.17 8.17-8.17a8.1 8.1 0 0 1 5.78 2.4 8.12 8.12 0 0 1 2.4 5.77c0 4.5-3.66 8.17-8.16 8.17zm4.48-6.12c-.25-.12-1.48-.73-1.7-.82-.23-.08-.39-.12-.56.13-.16.25-.64.82-.78.99-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.25-.01-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.61.57.25 1.02.4 1.37.51.58.18 1.11.16 1.52.1.46-.07 1.48-.6 1.69-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.16-.48-.28z" />
        </svg>
        <span>WhatsApp +256 773 207 919</span>
      </a>
    </section>
  </div>
);

const GalleryPage: React.FC = () => {
  const galleryImages = [
    { src: '/gallery/Eagles (1).jpeg', title: 'Match Day Intensity', tag: 'Eagles' },
    { src: '/gallery/Eagles (2).jpeg', title: 'Team Unity', tag: 'Eagles' },
    { src: '/gallery/Eagles (3).jpeg', title: 'Game Focus', tag: 'Eagles' },
    { src: '/gallery/Eagles (4).jpeg', title: 'Club Culture', tag: 'Eagles' },
    { src: '/gallery/Eagles (5).jpeg', title: 'Supporter Energy', tag: 'Eagles' },
    { src: '/gallery/Eagles (6).jpeg', title: 'Performance Drive', tag: 'Eagles' },
    { src: '/gallery/Eagles (7).jpeg', title: 'Training Ground', tag: 'Eagles' },
    { src: '/gallery/Eagles (8).jpeg', title: 'Player Focus', tag: 'Eagles' },
    { src: '/gallery/Eagles (9).jpeg', title: 'Winning Mindset', tag: 'Eagles' },
    { src: '/gallery/Stands/Stands (1).jpeg', title: 'Infrastructure Progress', tag: 'Stands' },
    { src: '/gallery/Stands/Stands (2).jpeg', title: 'Stands Development', tag: 'Stands' },
    { src: '/gallery/Stands/Stands (3).jpeg', title: 'Home Ground Growth', tag: 'Stands' },
    { src: '/gallery/Education & sports/Education (8).jpeg', title: 'Education Through Sport', tag: 'Education' },
    { src: '/gallery/Education & sports/Education (10).jpeg', title: 'Community Impact', tag: 'Education' },
    { src: '/gallery/Education & sports/Education (14).jpeg', title: 'Future Leaders', tag: 'Education' }
  ];

  const getCardClass = (index: number) => {
    if (index === 0) {
      return 'sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[380px]';
    }
    if (index % 5 === 0) {
      return 'sm:col-span-2 min-h-[260px]';
    }
    return 'min-h-[220px]';
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[#F5A623] text-xs font-black uppercase tracking-[0.3em] mb-2">Eagles TV</p>
          <h1 className="text-5xl sm:text-6xl font-black uppercase italic tracking-tighter text-[#081534]">Gallery</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
        {galleryImages.map((image, index) => (
          <article
            key={`${image.src}-${index}`}
            className={`group relative overflow-hidden rounded-xl bg-black shadow-sm ${getCardClass(index)}`}
          >
            <img
              src={toAssetUrl(image.src)}
              alt={image.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-[0.2em] mb-1">{image.tag}</p>
              <p className="text-white text-sm font-black uppercase tracking-wider">{image.title}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="max-w-[1700px] mx-auto px-4 lg:px-12 mt-6">
        {currentPage === 'home' ? <HomePage onNavigate={setCurrentPage} /> : null}
        {currentPage === 'about' ? <AboutPage /> : null}
        {currentPage === 'history' ? <HistoryPage /> : null}
        {currentPage === 'squad' ? <SquadPage /> : null}
        {currentPage === 'hall-of-fame' ? <HallOfFamePage /> : null}
        {currentPage === 'shop' ? <ShopPage /> : null}
        {currentPage === 'tv' ? <TvPage /> : null}
        {currentPage === 'donate' ? <DonatePage /> : null}
        {currentPage === 'contact' ? <PlayerSponsorPage /> : null}
        {currentPage === 'fitness-center' ? <FitnessCenterPage /> : null}
        {currentPage === 'our-projects' ? <ProjectsPage /> : null}
        {currentPage === 'our-foundation' ? <FoundationPage /> : null}
        {currentPage === 'sponsor-us' ? <SponsorUsPage /> : null}
        {currentPage === 'other-services' ? <OtherServicesPage /> : null}
        {currentPage === 'membership' ? <MembershipPage /> : null}
        {currentPage === 'gallery' ? <GalleryPage /> : null}
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
        {/* Angled Gold Accent Bar - Sports Energy */}
        <div className="relative h-2 bg-[#F5A623] transform -skew-y-1 origin-top-left scale-110"></div>
        
        {/* Main Footer Content */}
        <div className="relative z-10">
          {/* Top Stats Bar - Corporate Sports Data */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <p className="text-[#F5A623] text-xs font-black uppercase tracking-[0.28em] mb-6">Statistics</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">47</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Games Played</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">20</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Games Won</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">24</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Games Lost</p>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[#F5A623] text-3xl font-black">3</span>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Games Drawn</p>
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
                  <div className="rounded-xl border border-white/15 bg-white/5 p-2">
                    <img src="/KINTANTE FUN DAY FLYER.png" alt="Eagles Rugby Club" className="h-14 w-auto object-contain" />
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
                      <li><a href="mailto:eaglessportsfranchise@gmail.com" className="text-[#F5A623] text-sm hover:underline">eaglessportsfranchise@gmail.com</a></li>
                      <li><a href="https://wa.me/256773207919" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-[#F5A623] transition-colors">WhatsApp: +256773207919</a></li>
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




