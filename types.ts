
export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  date?: string;
  duration?: string;
  type: 'video' | 'news' | 'gallery';
}

export interface Player {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  number: string;
  gamesPlayed: number;
}

export interface Athlete {
  id: string;
  name: string;
  profession: string;
  phone: string;
  imageUrl: string;
}

export interface XPlayer {
  id: string;
  name: string;
  currentClub: string;
  imageUrl: string;
  number: string;
}

export interface HallOfFameMember {
  id: string;
  name: string;
  imageUrl: string;
  number: string;
  title: string;
}

export interface Standing {
  pos: number;
  team: string;
  p: number;
  w: number;
  l: number;
  bp: number;
  gd: number;
  pts: number;
  logo: string;
}

export interface TVItem {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  url?: string;
}

export interface MatchInfo {
  opponent: string;
  opponentLogo: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  venue: string;
  competition: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

export interface ContactInfo {
  name: string;
  phone: string;
  phoneHref: string;
  role?: string;
  email?: string;
}

export interface PurposeItem {
  title: string;
  description: string;
}

export interface ValueItem {
  name: string;
  description: string;
}

export interface ClubOverview {
  title: string;
  summary: string;
  paragraphs: string[];
}

export interface FitnessProgram {
  intro: string;
  schedule: string;
  pricing: string[];
  benefits: string[];
  feeUse: string[];
}

export interface ProjectStat {
  label: string;
  value: string;
  description: string;
}

export interface FoundationImpact {
  title: string;
  description: string;
}

export interface SponsorshipTier {
  name: string;
  price: string;
  keyInclusions: string[];
  benefits: string[];
}

export interface PlayerSponsorProgram {
  offer: string;
  supports: string[];
  reasons: string[];
}

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
}
