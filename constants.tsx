import { NewsItem, Player, Standing, TVItem, Product, XPlayer, HallOfFameMember } from './types';

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
  { id: '1', name: 'Ogwal Joshua', position: 'Fly Half', number: '1', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-1/300/400' },
  { id: '2', name: 'Kisubi Paul', position: 'Prop', number: '2', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-2/300/400' },
  { id: '3', name: 'Matovu Jasper', position: 'Winger', number: '3', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-3/300/400' },
  { id: '4', name: 'Anywar Jonathan', position: 'Outside Centre', number: '4', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-4/300/400' },
  { id: '5', name: 'Ssewanyana Liam', position: 'Scrum Half', number: '5', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-5/300/400' },
  { id: '6', name: 'Jombwe Jose', position: 'Prop', number: '6', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-6/300/400' },
  { id: '7', name: 'Olara Humphrey', position: 'Lock', number: '7', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-7/300/400' },
  { id: '8', name: 'Aporu Derrick', position: 'Full Back', number: '8', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-8/300/400' },
  { id: '9', name: 'Joseph Luswata', position: 'Winger', number: '9', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-9/300/400' },
  { id: '10', name: 'Wasula Gerry Peter', position: 'Prop', number: '10', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-10/300/400' },
  { id: '11', name: 'Lagat Mark', position: 'Outside Centre', number: '11', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-11/300/400' },
  { id: '12', name: 'Ssali Raymond', position: 'Winger', number: '12', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-12/300/400' },
  { id: '13', name: 'Ekelot Mathew', position: 'Scrum Half', number: '13', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-13/300/400' },
  { id: '14', name: 'Lema Stephen', position: 'Fly Half', number: '14', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-14/300/400' },
  { id: '15', name: 'Stuart Mutyaba', position: 'Prop', number: '15', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-15/300/400' },
  { id: '16', name: 'Ochan Polycarp', position: 'Flanker', number: '16', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-16/300/400' },
  { id: '17', name: 'Wamond Eric', position: 'Team Manager', number: '17', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-17/300/400' },
  { id: '18', name: 'Kabalega Adam', position: 'Prop', number: '18', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-18/300/400' },
  { id: '19', name: 'Tayebwa Charles', position: 'Scrum Half', number: '19', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-19/300/400' },
  { id: '20', name: 'Nanagalama Johna', position: 'Prop', number: '20', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-20/300/400' },
  { id: '21', name: 'Baganizi Mark', position: 'Scrum Half', number: '21', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-21/300/400' },
  { id: '22', name: 'Ssemugenyi Jonah', position: 'Winger', number: '22', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-22/300/400' },
  { id: '23', name: 'Komakech Samuel', position: 'Winger', number: '23', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-23/300/400' },
  { id: '24', name: 'Serunjogi William', position: 'Winger', number: '24', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-24/300/400' },
  { id: '25', name: 'Etoko Timothy', position: 'Lock', number: '25', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-25/300/400' },
  { id: '26', name: 'Okwera Ronaldo', position: 'Prop', number: '26', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-26/300/400' },
  { id: '27', name: 'Obwana Desire', position: 'Full Back', number: '27', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-27/300/400' },
  { id: '28', name: 'Okot Andrew', position: 'Prop', number: '28', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-28/300/400' },
  { id: '29', name: 'Ojara Emmanuel', position: 'Inside Centre', number: '29', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-29/300/400' },
  { id: '30', name: 'KiprotichTinnito Satya', position: 'Winger', number: '30', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-30/300/400' },
  { id: '31', name: 'Mwesigwa Herman', position: 'Winger', number: '31', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-31/300/400' },
  { id: '32', name: 'Rwoth-Ongeo Henry', position: 'Outside Centre', number: '32', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-32/300/400' },
  { id: '33', name: 'Otim Chris Ham', position: 'Prop', number: '33', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-33/300/400' },
  { id: '34', name: 'Odongo Griffin Paul', position: 'Prop', number: '34', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-34/300/400' },
  { id: '35', name: 'Matovu Fahad', position: 'Coach', number: '35', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-35/300/400' },
  { id: '36', name: 'Bogere Francis', position: 'Eighth Man', number: '36', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-36/300/400' },
  { id: '37', name: 'Lumala Alpha', position: 'Lock', number: '37', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-37/300/400' },
  { id: '38', name: 'Ntare Elvis', position: 'Winger', number: '38', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-38/300/400' },
  { id: '39', name: 'Lagom Danny', position: 'Centre', number: '39', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-39/300/400' },
  { id: '40', name: 'Mungufeni William', position: 'Eighth Man', number: '40', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-40/300/400' },
  { id: '41', name: 'Ochora Daniel', position: 'Lock (Student)', number: '41', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-41/300/400' },
  { id: '42', name: 'Omeda Dan Mark', position: 'Centre', number: '42', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-42/300/400' },
  { id: '43', name: 'Wagabaza Jimmy', position: 'Flanker', number: '43', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-43/300/400' },
  { id: '44', name: 'OmonginJulius', position: 'Winger', number: '44', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-44/300/400' },
  { id: '45', name: 'Kauki Sulaiman', position: 'Winger', number: '45', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-45/300/400' },
  { id: '46', name: 'Muwola Malcom', position: 'Winger', number: '46', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-46/300/400' },
  { id: '47', name: 'Moshe Keith', position: 'Flanker', number: '47', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-47/300/400' },
  { id: '48', name: 'Osuta Aaron', position: 'Lock', number: '48', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-48/300/400' },
  { id: '49', name: 'Olaro Paschal', position: 'Centre', number: '49', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-49/300/400' },
  { id: '50', name: 'Oca Manuel Owen', position: 'Winger', number: '50', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-50/300/400' },
  { id: '51', name: 'Kitara Regan', position: 'Full Back', number: '51', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-51/300/400' },
  { id: '52', name: 'Nsubuga Chris', position: 'Winger', number: '52', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-52/300/400' },
  { id: '53', name: 'Karama Rodney', position: 'Inside Centre', number: '53', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-53/300/400' },
  { id: '54', name: 'Sabunyo Samuel', position: 'Lock', number: '54', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-54/300/400' },
  { id: '55', name: 'Araptai Willy', position: 'Flanker', number: '55', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-55/300/400' },
  { id: '56', name: 'Ateng Robert', position: 'Prop', number: '56', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-56/300/400' },
  { id: '57', name: 'Masiga Jirch', position: 'Winger', number: '57', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-57/300/400' },
  { id: '58', name: 'Mbubi Shamick', position: 'Fly Half', number: '58', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-58/300/400' },
  { id: '59', name: 'Lukwago Santos', position: 'Winger', number: '59', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-59/300/400' },
  { id: '60', name: 'Kisitu Hilary', position: 'Fly Half', number: '60', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-60/300/400' },
  { id: '61', name: 'Mujuni Denis', position: 'Scrum Half', number: '61', gamesPlayed: 0, imageUrl: 'https://picsum.photos/seed/eagles-player-61/300/400' }
];

export const MOCK_X_PLAYERS: XPlayer[] = [
  { id: 'xp1', name: 'Obalim Eddie', currentClub: 'Currently playing at Buffaloes', number: '1', imageUrl: '/our%20x-players/Obalim%20Eddie%20%282%29.jpeg' },
  { id: 'xp2', name: 'Victor Baguma', currentClub: 'Currently playing at Buffaloes', number: '2', imageUrl: '' },
  { id: 'xp3', name: 'Kasozi Timothy', currentClub: 'Currently working with finance', number: '3', imageUrl: '' },
  { id: 'xp4', name: 'Arshley Sebayiga', currentClub: 'Currently retired due to injury', number: '4', imageUrl: '/our%20x-players/Arshley%20sebayiga.jpeg' },
  { id: 'xp5', name: 'Jordan Sebayiga', currentClub: 'Traveled to Ireland to take up a boxing career', number: '5', imageUrl: '/our%20x-players/Jordan%20sebayiga.jpeg' },
  { id: 'xp6', name: 'Wejuli Quinteen', currentClub: 'Currently working at Post Bank', number: '6', imageUrl: '/our%20x-players/Wejuli%20quinteen.jpeg' },
  { id: 'xp7', name: 'Felix Kyeyune', currentClub: 'Started a branding and printing business', number: '7', imageUrl: '' },
  { id: 'xp8', name: 'Abel Mark Nabireba', currentClub: 'Currently active', number: '8', imageUrl: '' },
  { id: 'xp9', name: 'Mugisha Keith', currentClub: 'Currently playing at Heathens', number: '9', imageUrl: '/our%20x-players/Mugisha%20keith.jpeg' },
  { id: 'xp10', name: 'Waiswa Yusuf', currentClub: 'Currently playing at Heathens', number: '10', imageUrl: '/our%20x-players/Waiswa%20yusuf.jpeg' },
  { id: 'xp11', name: 'Juuko Jude', currentClub: 'Currently playing at Heathens', number: '11', imageUrl: '/our%20x-players/Juuko%20jude.jpeg' },
  { id: 'xp12', name: 'Jason Nuwamanya', currentClub: 'Currently playing at Heathens', number: '12', imageUrl: '/our%20x-players/Jason%20nuwamanya.jpeg' },
  { id: 'xp13', name: 'Otim Geofrey', currentClub: 'Currently playing at Victoria Sharks', number: '13', imageUrl: '/our%20x-players/Otim%20geofrey.jpeg' },
  { id: 'xp14', name: 'Klaus Katende Yusuf', currentClub: 'Currently playing at Impis', number: '14', imageUrl: '/our%20x-players/Klaus%20katende%20yusuf.jpeg' },
  { id: 'xp15', name: 'Job Wembabazi', currentClub: 'Currently playing at Rhinos', number: '15', imageUrl: '/our%20x-players/Job%20wembabazi.jpeg' },
  { id: 'xp16', name: 'Emma Neek', currentClub: 'Currently playing at Liira Big Boys', number: '16', imageUrl: '' },
  { id: 'xp17', name: 'Akala Ngereza', currentClub: 'Currently playing at Hippos', number: '17', imageUrl: '' },
  { id: 'xp18', name: 'Odonkara Emmanuel', currentClub: 'Currently playing at Gulu City Falcons', number: '18', imageUrl: '/our%20x-players/Odonkara%20emmanuel.jpeg' },
  { id: 'xp19', name: 'Mono Geofrey', currentClub: 'Currently retired', number: '19', imageUrl: '' },
  { id: 'xp20', name: 'Daniel Odonga', currentClub: 'Currently playing at Kitgum Lions', number: '20', imageUrl: '' },
  { id: 'xp21', name: 'Okello George', currentClub: 'Currently playing at Rams', number: '21', imageUrl: '' },
  { id: 'xp22', name: 'Calvin Ocan', currentClub: 'Currently retired', number: '22', imageUrl: '' },
  { id: 'xp23', name: 'Hamza Abala', currentClub: 'Currently retired', number: '23', imageUrl: '' },
  { id: 'xp24', name: 'Kintu Travor', currentClub: 'Currently retired', number: '24', imageUrl: '' },
  { id: 'xp25', name: 'Obol Joshua', currentClub: 'Currently playing at Rhinos', number: '25', imageUrl: '/our%20x-players/Obol%20joshua.jpeg' },
  { id: 'xp26', name: 'Obwona Charles', currentClub: 'Currently working', number: '26', imageUrl: '/our%20x-players/Obwona%20charles.jpeg' },
  { id: 'xp27', name: 'Anthony Oluka', currentClub: 'Status not specified', number: '27', imageUrl: '' }
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
  { id: 'ab1', name: 'Otim Chris', number: '1', title: 'Architect and XR Developer', imageUrl: '/gallery/Eagles (12).jpeg' }
];

export const MOCK_TRENDING_VIDEOS: NewsItem[] = [
  { id: 'g1', title: 'Team Unity', imageUrl: '/gallery/Eagles (1).jpeg', type: 'gallery' },
  { id: 'g2', title: 'Match Day', imageUrl: '/gallery/Eagles (2).jpeg', type: 'gallery' },
  { id: 'g3', title: 'Club Spirit', imageUrl: '/gallery/Eagles (3).jpeg', type: 'gallery' },
  { id: 'g4', title: 'Game Focus', imageUrl: '/gallery/Eagles (4).jpeg', type: 'gallery' },
  { id: 'g5', title: 'Supporters', imageUrl: '/gallery/Eagles (5).jpeg', type: 'gallery' },
  { id: 'g6', title: 'Training Day', imageUrl: '/gallery/Eagles (6).jpeg', type: 'gallery' }
];

export const MOCK_SHOP_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Eagles Official Kit', price: 'UGX 150,000', imageUrl: '/kit.jpeg' },
  { id: 'p2', name: 'Eagles Membership Card', price: 'UGX 100,000', imageUrl: '/kampanis.png' }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', title: 'How to watch Wolves v Arsenal live on TV', imageUrl: 'https://picsum.photos/seed/news1/600/400', type: 'news' },
  { id: 'n2', title: "Women's game v Brighton postponed", imageUrl: 'https://picsum.photos/seed/news2/600/400', type: 'news' },
  { id: 'n3', title: 'Karen Carney reflects on her trophy laden career', imageUrl: 'https://picsum.photos/seed/news3/600/400', type: 'news' },
  { id: 'n4', title: 'Arteta provides fitness update on Jurrien Timber', imageUrl: 'https://picsum.photos/seed/news4/600/400', type: 'news' }
];

export const MOCK_TV: TVItem[] = [
  { id: 'tv1', title: 'Eagles TV Video 1', imageUrl: '/gallery/Eagles (1).jpeg', duration: 'Watch', url: 'https://youtu.be/o-qEqvP163c?si=I_hVjbOfspodMfv0' },
  { id: 'tv2', title: 'Eagles TV Video 2', imageUrl: '/gallery/Eagles (2).jpeg', duration: 'Watch', url: 'https://youtu.be/39yjNvRlciM?si=4qcUffpC7f3_rgrB' },
  { id: 'tv3', title: 'Eagles TV Video 3', imageUrl: '/gallery/Eagles (3).jpeg', duration: 'Watch', url: 'https://youtu.be/LA73pD4EFv8?si=3TkIKBClzh_NMQnv' },
  { id: 'tv4', title: 'Eagles TV Video 4', imageUrl: '/gallery/Eagles (4).jpeg', duration: 'Watch', url: 'https://youtu.be/ZCTuhWCQo-g?si=kznPN4a4sCXtiZ2p' },
  { id: 'tv5', title: 'Eagles TV Video 5', imageUrl: '/gallery/Eagles (5).jpeg', duration: 'Watch', url: 'https://youtu.be/ShB3urBhSqk?si=FcijI_e3EhPJDSZM' },
  { id: 'tv6', title: 'Eagles TV Video 6', imageUrl: '/gallery/Eagles (6).jpeg', duration: 'Watch', url: 'https://youtu.be/ouXulz0Isek?si=Na9xfg8x8n1NPSaQ' },
  { id: 'tv7', title: 'Eagles TV Video 7', imageUrl: '/gallery/Eagles (7).jpeg', duration: 'Watch', url: 'https://youtu.be/TSwLQBV3yRg?si=pwZ4xJ3KdxsFe8-o' },
  { id: 'tv8', title: 'Eagles TV Video 8', imageUrl: '/gallery/Eagles (8).jpeg', duration: 'Watch', url: 'https://youtu.be/zd3W9rS37Ik?si=3hCCJ3jJ0l4xLz1b' },
  { id: 'tv9', title: 'Eagles TV Video 9', imageUrl: '/gallery/Eagles (9).jpeg', duration: 'Watch', url: 'https://youtu.be/xoS_RjG9cyw?si=-3D_7bMWSIh7rcOz' },
  { id: 'tv10', title: 'Eagles TV Video 10', imageUrl: '/gallery/Eagles (10).jpeg', duration: 'Watch', url: 'https://youtu.be/uPfNxp8J0nk?si=tbBFcgU0vU8qKLUy' },
  { id: 'tv11', title: 'Eagles TV Video 11', imageUrl: '/gallery/Eagles (12).jpeg', duration: 'Watch', url: 'https://youtu.be/EZK62CZhLlY?si=DnnB0Wu3ReQj_W2w' },
  { id: 'tv12', title: 'Eagles TV Video 12', imageUrl: '/gallery/Eagles (13).jpeg', duration: 'Watch', url: 'https://youtu.be/2G4OesWitvI?si=5FkkuIZfxJtXPf3A' },
  { id: 'tv13', title: 'Eagles TV Video 13', imageUrl: '/gallery/Eagles (14).jpeg', duration: 'Watch', url: 'https://youtu.be/kt1cIrKAQcI?si=JJZuvSiEK8nHiGlg' },
  { id: 'tv14', title: 'Eagles TV Video 14', imageUrl: '/gallery/Eagles (15).jpeg', duration: 'Watch', url: 'https://youtu.be/DRdkGaCTANY?si=XP6bbw6KcKHrwRsT' }
];
