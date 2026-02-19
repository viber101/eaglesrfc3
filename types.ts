
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
  gd: number;
  pts: number;
  logo: string;
}

export interface TVItem {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
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
