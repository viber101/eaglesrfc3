
import { NewsItem, Player, Standing, TVItem, Product, Athlete } from './types';

export const COLORS = {
  primaryRed: '#db0007',
  darkBlue: '#023474',
  arsenalGold: '#9c824a',
  lightGray: '#f4f4f4',
  darkGray: '#1a1a1a'
};

export const MOCK_STANDINGS: Standing[] = [
  { pos: 1, team: 'Blue Phoenix', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Emirates_Logo.svg/2560px-Emirates_Logo.svg.png' },
  { pos: 2, team: 'Eagles', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png' },
  { pos: 3, team: 'Golden Badgers', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png' },
  { pos: 4, team: 'Jaguars', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Wolverhampton_Wanderers.svg/1200px-Wolverhampton_Wanderers.svg.png' },
  { pos: 5, team: 'Mukono Hawks', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/1200px-Aston_Villa_FC_crest_%282016%29.svg.png' },
  { pos: 6, team: 'Rams', p: 0, gd: 0, pts: 0, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png' }
];

export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Bukayo Saka', position: 'Forward', number: '7', imageUrl: 'https://picsum.photos/seed/saka/300/400' },
  { id: '2', name: 'Martin Odegaard', position: 'Midfielder', number: '8', imageUrl: 'https://picsum.photos/seed/martin/300/400' },
  { id: '3', name: 'Declan Rice', position: 'Midfielder', number: '41', imageUrl: 'https://picsum.photos/seed/rice/300/400' },
  { id: '4', name: 'William Saliba', position: 'Defender', number: '2', imageUrl: 'https://picsum.photos/seed/saliba/300/400' },
  { id: '5', name: 'Gabriel Magalhães', position: 'Defender', number: '6', imageUrl: 'https://picsum.photos/seed/gabriel/300/400' },
  { id: '6', name: 'Kai Havertz', position: 'Forward', number: '29', imageUrl: 'https://picsum.photos/seed/havertz/300/400' }
];

export const MOCK_ATHLETES: Athlete[] = [
  { id: 'a1', name: 'Thierry Henry', profession: 'Wine & Spirit Connoisseur', phone: '+44 20 7619 5000', imageUrl: 'https://picsum.photos/seed/henry/400/500' },
  { id: 'a2', name: 'Ian Wright', profession: 'Broadcasting & Media Mogul', phone: '+44 20 7619 5001', imageUrl: 'https://picsum.photos/seed/wright/400/500' },
  { id: 'a3', name: 'Patrick Vieira', profession: 'Sports Tech Founder', phone: '+44 20 7619 5002', imageUrl: 'https://picsum.photos/seed/vieira/400/500' },
  { id: 'a4', name: 'Dennis Bergkamp', profession: 'Real Estate Developer', phone: '+44 20 7619 5003', imageUrl: 'https://picsum.photos/seed/dennis/400/500' },
  { id: 'a5', name: 'Robert Pires', profession: 'Fashion Brand Ambassador', phone: '+44 20 7619 5004', imageUrl: 'https://picsum.photos/seed/pires/400/500' },
  { id: 'a6', name: 'Freddie Ljungberg', profession: 'E-commerce Entrepreneur', phone: '+44 20 7619 5005', imageUrl: 'https://picsum.photos/seed/freddie/400/500' }
];

export const MOCK_TRENDING_VIDEOS: NewsItem[] = [
  {
    id: '1',
    title: 'Highlights | Arsenal 4-0 Wigan Athletic | Braisize',
    imageUrl: 'https://picsum.photos/seed/arsenal1/800/450',
    duration: '03:00',
    type: 'video'
  },
  {
    id: '2',
    title: 'Norgaard excited for FA Cup run draw?',
    imageUrl: 'https://picsum.photos/seed/arsenal2/800/450',
    duration: '01:55',
    type: 'video'
  },
  {
    id: '3',
    title: 'Mikel Arteta: We showed real desire',
    imageUrl: 'https://picsum.photos/seed/arsenal3/800/450',
    duration: '02:04',
    type: 'video'
  }
];

export const MOCK_SHOP_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Arsenal Classics Varsity Jacket', price: '£170.00', imageUrl: 'https://picsum.photos/seed/kit1/400/500' },
  { id: 'p2', name: 'Arsenal adidas 25/26 Third Shirt', price: '£85.00', imageUrl: 'https://picsum.photos/seed/kit2/400/500' },
  { id: 'p3', name: 'Arsenal Classics Field Jacket', price: '£105.00', imageUrl: 'https://picsum.photos/seed/kit3/400/500' },
  { id: 'p4', name: 'Pre-Match Warm Up Top', price: '£55.00', imageUrl: 'https://picsum.photos/seed/kit4/400/500' },
  { id: 'p5', name: 'Arsenal Away Kit 24/25', price: '£80.00', imageUrl: 'https://picsum.photos/seed/kit5/400/500' }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', title: 'How to watch Wolves v Arsenal live on TV', imageUrl: 'https://picsum.photos/seed/news1/600/400', type: 'news' },
  { id: 'n2', title: "Women's game v Brighton postponed", imageUrl: 'https://picsum.photos/seed/news2/600/400', type: 'news' },
  { id: 'n3', title: 'Karen Carney reflects on her trophy laden career', imageUrl: 'https://picsum.photos/seed/news3/600/400', type: 'news' },
  { id: 'n4', title: 'Arteta provides fitness update on Jurrien Timber', imageUrl: 'https://picsum.photos/seed/news4/600/400', type: 'news' }
];

export const MOCK_TV: TVItem[] = [
  { id: 'tv1', title: 'Inside Training', imageUrl: 'https://picsum.photos/seed/tv1/300/200', duration: '12:05' },
  { id: 'tv2', title: 'Classic Matches: Highbury', imageUrl: 'https://picsum.photos/seed/tv2/300/200', duration: '08:45' },
  { id: 'tv3', title: 'Behind the Scenes: Emirates', imageUrl: 'https://picsum.photos/seed/tv3/300/200', duration: '15:20' },
  { id: 'tv4', title: 'Player Interview: Saka', imageUrl: 'https://picsum.photos/seed/tv4/300/200', duration: '05:30' },
  { id: 'tv5', title: 'Academy Spotlight', imageUrl: 'https://picsum.photos/seed/tv5/300/200', duration: '10:00' }
];
