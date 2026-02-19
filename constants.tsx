
import { NewsItem, Player, Standing, TVItem, Product, Athlete, XPlayer, HallOfFameMember } from './types';

export const COLORS = {
  primaryOrange: '#F5A623',
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
  { id: '1', name: 'Nagalama Johnathan', position: 'Prop', number: '1', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-1/300/400' },
  { id: '2', name: 'Otim Chris', position: 'Hooker', number: '2', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-2/300/400' },
  { id: '3', name: 'Paul Kisubi', position: 'Prop', number: '3', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-3/300/400' },
  { id: '4', name: 'Ochora Daniel', position: 'Lock', number: '4', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-4/300/400' },
  { id: '5', name: 'Sabunyo Samyl', position: 'Lock', number: '5', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-5/300/400' },
  { id: '6', name: 'Arap Willy', position: 'Flanker', number: '6', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-6/300/400' },
  { id: '7', name: 'Bogere Francis', position: 'Eighth Man', number: '7', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-7/300/400' },
  { id: '8', name: 'Mungufeni Williams Kato', position: '8th Man', number: '8', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-8/300/400' },
  { id: '9', name: 'Liam Sewanyana', position: 'Scrum Half', number: '9', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-9/300/400' },
  { id: '10', name: 'Joshua Ogwal', position: 'Fly Half', number: '10', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-10/300/400' },
  { id: '11', name: 'Julius Omongin', position: 'Winger', number: '11', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-11/300/400' },
  { id: '12', name: 'Ojara Emmanuel', position: 'Inside Centre', number: '12', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-12/300/400' },
  { id: '13', name: 'Lagat Mark', position: 'Outside Centre', number: '13', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-13/300/400' },
  { id: '14', name: 'Owen Manuel Oca', position: 'Winger', number: '14', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-14/300/400' },
  { id: '15', name: 'Regan Origi', position: 'Winger', number: '15', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-15/300/400' },
  { id: '16', name: 'Wasula Gerry Peter', position: 'Prop', number: '16', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-16/300/400' },
  { id: '17', name: 'Griffin Odong', position: 'Prop', number: '17', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-17/300/400' },
  { id: '18', name: 'Jombwe Josia', position: 'Prop', number: '18', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-18/300/400' },
  { id: '19', name: 'Olara Humphrey Jacob', position: 'Flanker', number: '19', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-19/300/400' },
  { id: '20', name: 'Osuta Aaron', position: 'Lock', number: '20', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-20/300/400' },
  { id: '21', name: 'Danny Lagom', position: 'Inside Centre', number: '21', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-21/300/400' },
  { id: '22', name: 'Herman Mwesigwa', position: 'Winger', number: '22', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-22/300/400' },
  { id: '23', name: 'Ateng Robert', position: 'Prop', number: '23', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-23/300/400' },
  { id: '24', name: 'Ekelot Mathew Calvin', position: 'Scrum Half', number: '24', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-24/300/400' },
  { id: '25', name: 'Henry Rwoth', position: 'Inside Centre', number: '25', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-25/300/400' },
  { id: '26', name: 'Elvis Ntale', position: 'Winger', number: '26', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-26/300/400' },
  { id: '27', name: 'Baganizi Mark', position: 'Scrum Half', number: '27', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-27/300/400' },
  { id: '28', name: 'Anywar Jonnar', position: 'Inside Centre', number: '28', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-28/300/400' },
  { id: '29', name: 'Jasper Eron Matovu', position: 'Winger', number: '29', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-29/300/400' },
  { id: '30', name: 'Satya Kiprotich', position: 'Winger', number: '30', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-30/300/400' },
  { id: '31', name: 'Charles Tayebwa', position: 'Scrum Half', number: '31', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-31/300/400' },
  { id: '32', name: 'Fahad Matovu', position: 'Coach', number: '32', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-32/300/400' },
  { id: '33', name: 'Moshe', position: 'Flanker', number: '33', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-33/300/400' },
  { id: '34', name: 'Etoke', position: 'Lock', number: '34', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-34/300/400' },
  { id: '35', name: 'Olaro Jacobs', position: 'Lock', number: '35', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-35/300/400' },
  { id: '36', name: 'Karama Rodney', position: 'Inside Centre', number: '36', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-36/300/400' },
  { id: '37', name: 'Policap', position: 'Lock', number: '37', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-37/300/400' },
  { id: '38', name: 'Stuart Mutyaba', position: 'Prop', number: '38', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-38/300/400' },
  { id: '39', name: 'Muwola Malcolm', position: 'Winger', number: '39', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-39/300/400' },
  { id: '40', name: 'Lema', position: 'Fly Half', number: '40', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-40/300/400' },
  { id: '41', name: 'Koma Samuel', position: 'Winger', number: '41', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-41/300/400' },
  { id: '42', name: 'Kauchi Sulaiman', position: 'Winger', number: '42', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-42/300/400' },
  { id: '43', name: 'Semugenyi Jogna', position: 'Winger', number: '43', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-43/300/400' },
  { id: '44', name: 'Okot Andrew', position: 'Prop', number: '44', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-44/300/400' },
  { id: '45', name: 'Alpha Lumala', position: 'Lock', number: '45', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-45/300/400' },
  { id: '46', name: 'Adam Kabalega', position: 'Prop', number: '46', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-46/300/400' },
  { id: '47', name: 'Olaro Pascol', position: 'Flanker', number: '47', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-47/300/400' },
  { id: '48', name: 'Aporu Derick', position: 'Full Back', number: '48', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-48/300/400' },
  { id: '49', name: 'Salli', position: 'Winger', number: '49', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-49/300/400' },
  { id: '50', name: 'Luswata', position: 'Winger', number: '50', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-50/300/400' },
  { id: '51', name: 'Arojjo Joshua', position: 'Flanker', number: '51', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-51/300/400' },
  { id: '52', name: 'Obowna Desire', position: 'Full Back', number: '52', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-52/300/400' },
  { id: '53', name: 'Serunjogi George William', position: 'Winger', number: '53', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-53/300/400' },
  { id: '54', name: 'Lukwago Santos', position: 'Winger', number: '54', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-54/300/400' },
  { id: '55', name: 'Wagabaza Jimmy', position: 'Flanker', number: '55', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-55/300/400' },
  { id: '56', name: 'Okwera Ronaldo', position: 'Prop', number: '56', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-56/300/400' }
];

export const MOCK_ATHLETES: Athlete[] = [
  { id: 'a1', name: 'Thierry Henry', profession: 'Wine & Spirit Connoisseur', phone: '+44 20 7619 5000', imageUrl: 'https://picsum.photos/seed/henry/400/500' },
  { id: 'a2', name: 'Ian Wright', profession: 'Broadcasting & Media Mogul', phone: '+44 20 7619 5001', imageUrl: 'https://picsum.photos/seed/wright/400/500' },
  { id: 'a3', name: 'Patrick Vieira', profession: 'Sports Tech Founder', phone: '+44 20 7619 5002', imageUrl: 'https://picsum.photos/seed/vieira/400/500' },
  { id: 'a4', name: 'Dennis Bergkamp', profession: 'Real Estate Developer', phone: '+44 20 7619 5003', imageUrl: 'https://picsum.photos/seed/dennis/400/500' },
  { id: 'a5', name: 'Robert Pires', profession: 'Fashion Brand Ambassador', phone: '+44 20 7619 5004', imageUrl: 'https://picsum.photos/seed/pires/400/500' },
  { id: 'a6', name: 'Freddie Ljungberg', profession: 'E-commerce Entrepreneur', phone: '+44 20 7619 5005', imageUrl: 'https://picsum.photos/seed/freddie/400/500' }
];

export const MOCK_X_PLAYERS: XPlayer[] = [
  { id: 'xp1', name: 'Mugish Keith', currentClub: 'Currently playing at Heathens RFC', number: '1', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-1/300/400' },
  { id: 'xp2', name: 'Waiswa Yusuf', currentClub: 'Currently playing at Heathens RFC', number: '2', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-2/300/400' },
  { id: 'xp3', name: 'Jjuko Jude', currentClub: 'Currently playing at Heathens RFC', number: '3', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-3/300/400' },
  { id: 'xp4', name: 'Jason Nowadays', currentClub: 'Currently playing at Heathens RFC', number: '4', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-4/300/400' },
  { id: 'xp5', name: 'Otim Godfrey', currentClub: 'Currently playing at Victoria Sharks', number: '5', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-5/300/400' },
  { id: 'xp6', name: 'Clause', currentClub: 'Currently playing at Heathens RFC', number: '6', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-6/300/400' },
  { id: 'xp7', name: 'Job Wembabazi', currentClub: 'Currently playing at Rhinos RFC', number: '7', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-7/300/400' },
  { id: 'xp8', name: 'Emma Neek', currentClub: 'Currently playing at Lira Bulls', number: '8', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-8/300/400' },
  { id: 'xp9', name: 'Akala Ngereza', currentClub: 'Currently playing at Jinja Hippos', number: '9', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-9/300/400' },
  { id: 'xp10', name: 'Odonkara Emma', currentClub: 'Currently playing at Gulu City Falcons', number: '10', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-10/300/400' },
  { id: 'xp11', name: 'Daniel Choline', currentClub: 'Currently playing at Kitgum Lions', number: '11', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-11/300/400' },
  { id: 'xp12', name: 'Mono Godfrey', currentClub: 'Retired', number: '12', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-12/300/400' },
  { id: 'xp13', name: 'Okello Geoge', currentClub: 'Retired', number: '13', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-13/300/400' },
  { id: 'xp14', name: 'Calvin Ochen', currentClub: 'Retired', number: '14', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-14/300/400' },
  { id: 'xp15', name: 'Hamza Abala', currentClub: 'Retired', number: '15', imageUrl: 'https://picsum.photos/seed/eagles-xplayer-15/300/400' }
];

export const MOCK_HALL_OF_FAME: HallOfFameMember[] = [
  { id: 'hf1', name: 'Henry Rwoth', number: '1', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-1/300/400' },
  { id: 'hf2', name: 'Bogere Francis', number: '2', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-2/300/400' },
  { id: 'hf3', name: 'Liam Sewanyana', number: '3', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-3/300/400' },
  { id: 'hf4', name: 'Araptai Willy', number: '4', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-4/300/400' },
  { id: 'hf5', name: 'Ateng Robert', number: '5', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-5/300/400' },
  { id: 'hf6', name: 'Ojara Emmanuel', number: '6', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-6/300/400' },
  { id: 'hf7', name: 'Regan Origi', number: '7', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-7/300/400' },
  { id: 'hf8', name: 'Osura Aaron', number: '8', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-8/300/400' },
  { id: 'hf9', name: 'Daniel Ochora', number: '9', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-9/300/400' },
  { id: 'hf10', name: 'Dan Mark Omeda', number: '10', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-10/300/400' },
  { id: 'hf11', name: 'Shamick Mbubi', number: '11', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-11/300/400' },
  { id: 'hf12', name: 'Kayondo Ronnie', number: '12', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-12/300/400' },
  { id: 'hf13', name: 'Edmond Tumusime', number: '13', title: 'Hall of Fame', imageUrl: 'https://picsum.photos/seed/eagles-hof-13/300/400' }
];

export const MOCK_BUSINESS_ATHLETES: HallOfFameMember[] = [
  { id: 'ab1', name: 'Otim Chris', number: '1', title: 'Architect and XR Developer', imageUrl: '/partners/Otim Chirs.jpeg' }
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
  { id: 'p1', name: 'Eagles Home Kit 2025', price: 'UGX 75,000', imageUrl: '/kit.jpeg' },
  { id: 'p2', name: 'Eagles Away Kit 2025', price: 'UGX 75,000', imageUrl: '/kit.jpeg' },
  { id: 'p3', name: 'Eagles Training Jersey', price: 'UGX 55,000', imageUrl: '/kit.jpeg' },
  { id: 'p4', name: 'Eagles Fan Jersey', price: 'UGX 45,000', imageUrl: '/kit.jpeg' },
  { id: 'p5', name: 'Eagles Limited Edition', price: 'UGX 95,000', imageUrl: '/kit.jpeg' }
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

