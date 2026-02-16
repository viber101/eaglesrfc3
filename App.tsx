
import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Card from './components/Card';
import { MOCK_TRENDING_VIDEOS, MOCK_SHOP_PRODUCTS, MOCK_NEWS, MOCK_STANDINGS, MOCK_PLAYERS, MOCK_TV, MOCK_ATHLETES } from './constants';

const MatchCard: React.FC<{
  isResult?: boolean;
  date: string;
  time: string;
  competition: string;
  venue: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score?: { home: number; away: number };
  showTickets?: boolean;
}> = ({ isResult, date, time, competition, venue, homeTeam, awayTeam, score, showTickets }) => (
  <div className="bg-white shadow-sm border-t-2 border-[#db0007] mb-4">
    <div className="flex justify-between px-4 py-3 border-b border-gray-100">
      <div className="text-left">
        <p className="text-[10px] font-extrabold uppercase text-gray-900">{date}</p>
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">KICKOFF - {time}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-extrabold uppercase text-gray-900">{competition}</p>
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{venue}</p>
      </div>
    </div>
    <div className="py-6 px-4">
      <div className="flex items-center justify-center space-x-6">
        <div className="flex flex-col items-center w-24">
          <img src={homeTeam.logo} alt={homeTeam.name} className="h-14 w-14 object-contain mb-2" />
          <span className="text-[11px] font-extrabold uppercase text-gray-900 text-center">{homeTeam.name}</span>
        </div>
        <div className="flex items-center">
          {isResult && score ? (
            <div className="flex items-center space-x-2 text-2xl font-black">
              <span className="text-[#db0007]">{score.home}</span>
              <span className="text-gray-900">-</span>
              <span className="text-gray-900">{score.away}</span>
            </div>
          ) : (
            <span className="text-2xl font-medium text-[#db0007] italic">V</span>
          )}
        </div>
        <div className="flex flex-col items-center w-24">
          <img src={awayTeam.logo} alt={awayTeam.name} className="h-14 w-14 object-contain mb-2" />
          <span className="text-[11px] font-extrabold uppercase text-gray-900 text-center">{awayTeam.name}</span>
        </div>
      </div>
    </div>
    <div className="px-6 pb-6 space-y-2">
      <button className="w-full bg-[#f0f0f0] text-gray-900 py-2.5 rounded-full font-extrabold uppercase text-[11px] tracking-wider hover:bg-gray-200 transition-colors">
        News & Video
      </button>
      {showTickets && (
        <button className="w-full bg-[#db0007] text-white py-2.5 rounded-full font-extrabold uppercase text-[11px] tracking-wider hover:bg-black transition-colors">
          Ticket Info
        </button>
      )}
    </div>
  </div>
);

const StandingsWidget: React.FC = () => (
  <div className="bg-white shadow-sm border-t-2 border-[#db0007] p-0 overflow-hidden">
    <div className="flex justify-end p-4 border-b border-gray-100">
      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">PREMIER LEAGUE</span>
    </div>
    <div className="px-2 py-4">
      <div className="grid grid-cols-12 text-[10px] font-black uppercase text-gray-400 px-4 mb-4">
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
              ? 'bg-[#db0007]/5 text-[#db0007] border-l-4 border-[#db0007]' 
              : 'text-gray-900 border-l-4 border-transparent'
            }`}
          >
            <div className={`col-span-2 ${s.team === 'Eagles' ? 'text-[#db0007]' : 'text-gray-400 opacity-60'}`}>{s.pos}</div>
            <div className="col-span-6 flex items-center space-x-3">
              <img src={s.logo} className="h-5 w-5 object-contain grayscale-0" alt={s.team} />
              <span className={`truncate tracking-tight ${s.team === 'Eagles' ? 'text-[#db0007]' : 'text-gray-300'}`}>{s.team}</span>
            </div>
            <div className={`col-span-2 text-center ${s.team === 'Eagles' ? 'text-[#db0007]' : 'text-gray-400'}`}>{s.gd}</div>
            <div className={`col-span-2 text-right ${s.team === 'Eagles' ? 'text-[#db0007]' : 'text-gray-400 opacity-0'}`}>{s.pts}</div>
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
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center shadow-lg text-[#db0007] hover:bg-[#db0007] hover:text-white transition-all -ml-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center shadow-lg text-[#db0007] hover:bg-[#db0007] hover:text-white transition-all -mr-6">
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

const HomePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <>
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
      <div className="lg:col-span-8 relative group cursor-pointer overflow-hidden aspect-video lg:aspect-auto h-full min-h-[500px]">
        <img src="https://picsum.photos/seed/arsenalhero/1600/900" alt="Arsenal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-12">
          <h1 className="text-white text-4xl lg:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none">Victory Through Harmony</h1>
          <button className="bg-[#db0007] text-white px-10 py-4 w-fit font-extrabold uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all">Latest Story</button>
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <StandingsWidget />
        <MatchCard date="WED FEB 18" time="20:00" competition="PREMIER LEAGUE" venue="MOLINEUX STADIUM" homeTeam={{ name: "Wolves", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Wolverhampton_Wanderers.svg/1200px-Wolverhampton_Wanderers.svg.png" }} awayTeam={{ name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" }} showTickets={true} />
      </div>
    </section>

    <Carousel title="Our First Team">
      {MOCK_PLAYERS.map((p) => (
        <div key={p.id} className="flex-none w-[280px] snap-start group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 text-4xl font-black text-white/50 drop-shadow-md">{p.number}</div>
          </div>
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#db0007] transition-colors">{p.name}</h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{p.position}</p>
        </div>
      ))}
    </Carousel>

    <section className="mb-16">
      <SectionHeader title="Our History" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 lg:p-12 shadow-sm border-l-8 border-[#db0007]">
        <div className="lg:col-span-5 aspect-square lg:aspect-video overflow-hidden">
          <img src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800" alt="History" className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-none">A Legacy of Unity</h3>
          <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
            <p>Founded in 2019 at Kitante Primary School, Eagles Rugby Club was born to champion the hidden talents of upcountry Uganda.</p>
            <p>From unbeaten promotion runs to building a family of over 200 athletes, we fly as one heart.</p>
            <button onClick={() => onNavigate('history')} className="text-[#db0007] font-black uppercase text-sm tracking-widest border-b-2 border-[#db0007] pb-1 hover:text-black hover:border-black transition-all">Explore Full History</button>
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
  </>
);

const AboutPage: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 animate-in fade-in duration-700 px-4">
    <div className="relative h-[650px] mb-20 overflow-hidden shadow-2xl">
      <img src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Eagles Rugby Club" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center px-12 lg:px-24">
        <h1 className="text-white text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">ONE HEART,<br />ONE VISION</h1>
        <p className="text-gray-200 text-xl font-bold max-w-2xl uppercase tracking-widest border-l-4 border-[#db0007] pl-6 py-2 bg-black/20 backdrop-blur-sm">A movement built on courage, brotherhood, and an unbreakable will to win.</p>
      </div>
    </div>
    <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-7 space-y-8">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#1a1a1a]">WHO WE ARE</h2>
        <div className="text-lg text-gray-600 font-medium leading-relaxed space-y-6">
          <p>Eagles Rugby Club is more than a team; it is a movement. Founded in 2019, we have rapidly emerged as a rising force in Ugandan rugby, dedicated to excellence on and off the pitch.</p>
          <div className="bg-[#db0007]/5 p-8 border-l-8 border-[#db0007]">
            <p className="italic font-bold text-gray-800 text-xl">"Greatness is achieved through unity and discipline."</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 relative group">
        <div className="absolute inset-0 bg-[#db0007] translate-x-4 translate-y-4 -z-10"></div>
        <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000" className="w-full shadow-xl grayscale hover:grayscale-0 transition-all duration-700" alt="Team Huddle" />
      </div>
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
        <span className="inline-block bg-[#db0007] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Established 2019</span>
        <h1 className="text-white text-7xl lg:text-[12rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
          FLIGHT<br /><span className="text-[#db0007]">PATH</span>
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
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#db0007]/10 -z-10 rounded-full blur-3xl"></div>
          <div className="aspect-[4/5] bg-[#1a1a1a] p-4 relative">
             <img 
               src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
               alt="Founder Kampani Arthur" 
             />
             <div className="absolute -bottom-8 -right-8 bg-[#db0007] text-white p-6 shadow-2xl">
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
              Inspired by his time as captain at Namulango College, Arthur instilled a culture of <span className="text-[#db0007] font-black">discipline, responsibility, and teamwork</span> that became the club's heartbeat.
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
          <div className="w-24 h-2 bg-[#db0007] mx-auto"></div>
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
                      <span className="text-[#db0007] text-4xl font-black italic">{m.year}</span>
                      <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900">{m.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-md ml-auto">{m.text}</p>
                    </div>
                  )}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-white border-4 border-[#db0007] flex items-center justify-center z-10 my-6 md:my-0 shadow-xl">
                  <div className="w-3 h-3 rounded-full bg-[#db0007]"></div>
                </div>

                <div className="md:w-1/2 px-12 text-center md:text-left">
                  {i % 2 === 0 && <div className="hidden md:block"></div>}
                  {i % 2 !== 0 && (
                    <div className="space-y-3">
                      <span className="text-[#db0007] text-4xl font-black italic">{m.year}</span>
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
            <div className="text-center lg:text-right border-l-8 border-[#db0007] pl-12 lg:pl-0 lg:border-l-0 lg:border-r-8 lg:pr-12">
              <p className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">
                "A WINNING TEAM BEATS WITH<br /><span className="text-[#db0007]">ONE HEART.</span>"
              </p>
              <button className="bg-white text-black px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#db0007] hover:text-white transition-all">Support The Vision</button>
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
    <div className="min-h-screen bg-[#f4f4f4] pb-20">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className={`max-w-[1700px] mx-auto ${currentPage === 'history' ? '' : 'px-4 lg:px-12 mt-6'}`}>
        {currentPage === 'home' ? <HomePage onNavigate={setCurrentPage} /> : null}
        {currentPage === 'about' ? <AboutPage /> : null}
        {currentPage === 'history' ? <HistoryPage /> : null}
        
        {['squad', 'shop', 'tv', 'donate', 'contact'].includes(currentPage) && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-300 mb-4">Under Construction</h2>
              <button onClick={() => setCurrentPage('home')} className="bg-[#db0007] text-white px-6 py-2 font-black uppercase text-[10px] tracking-widest">Return Home</button>
            </div>
          </div>
        )}

        <footer className={`pt-16 border-t border-gray-300 ${currentPage === 'history' ? 'px-6 lg:px-32' : ''}`}>
          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black uppercase text-gray-500 tracking-widest border-t border-gray-100 pt-12">
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Contact Us</a>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-12 font-bold pb-12">© EAGLES RUGBY CLUB 2025 - ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
