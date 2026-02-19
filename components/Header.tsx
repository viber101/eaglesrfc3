import React, { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isOurClubHovered, setIsOurClubHovered] = useState(false);
  const [isTvHovered, setIsTvHovered] = useState(false);
  const promoMessage = "Buy an Eagles Membership Card for as low as 100,000 UGX & enjoy up to 20% off in 20+ departmental stores. 20% of the proceeds support a child's education.";

  const navigateToAboutSection = (sectionId: string) => {
    onNavigate('about');
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const ourClubItems = [
    { name: 'Current Players', id: 'squad' },
    { name: 'Hall of Fame', id: 'hall-of-fame' },
    { name: 'Our Shop', id: 'shop' },
    { name: 'Fitness Center', id: 'fitness-center' },
    { name: 'History', id: 'history' },
    { name: 'Our Projects', id: 'our-projects' },
    { name: 'Our Foundation', id: 'our-foundation' },
    { name: 'Sponsor Us', id: 'sponsor-us' }
  ];

  const menuItems = [
    { name: 'Donate', id: 'donate' },
    { name: 'Player Sponsor', id: 'contact' }
  ];

  const tvItems = [
    { name: 'Eagles TV', id: 'tv' },
    { name: 'Gallery', id: 'gallery' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <style>{`
        @keyframes promo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="bg-black text-white border-b border-white/15 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-12">
          <div className="relative h-9 flex items-center overflow-hidden">
            <div
              className="flex items-center whitespace-nowrap font-semibold tracking-wide text-[10px] sm:text-[11px]"
              style={{ animation: 'promo-marquee 24s linear infinite', width: 'max-content' }}
            >
              <span className="mx-8">{promoMessage}</span>
              <span className="mx-8">{promoMessage}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/95 backdrop-blur text-white border-b border-white/10">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-12 flex items-center h-[82px] relative">
          <div
            className="flex items-center space-x-2 mr-10 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/KINTANTE FUN DAY FLYER.png"
              alt="Eagles RFC Logo"
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-10 uppercase text-[15px] font-black tracking-tight h-full">
            <button
              onClick={() => onNavigate('home')}
              className={`h-full flex items-center px-1 transition-all border-b-4 ${
                currentPage === 'home' ? 'border-[#F5A623] text-[#F5A623]' : 'border-transparent text-white hover:text-[#F5A623]'
              }`}
            >
              Home
            </button>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
            >
              <button
                onClick={() => onNavigate('about')}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  currentPage === 'about' || currentPage === 'history'
                    ? 'border-[#F5A623] text-[#F5A623]'
                    : 'border-transparent text-white hover:text-[#F5A623]'
                }`}
              >
                About
                <svg className={`ml-1 w-3 h-3 transition-transform ${isAboutHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isAboutHovered && (
                <div className="absolute top-full left-0 w-56 bg-[#111] text-white border border-white/15 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => onNavigate('about')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('vision')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider border-t border-white/10"
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('mission')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider border-t border-white/10"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('core-values')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider border-t border-white/10"
                  >
                    Core Values
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('home-ground')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider border-t border-white/10"
                  >
                    Home Ground
                  </button>
                  <button
                    onClick={() => onNavigate('history')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider border-t border-white/10"
                  >
                    Our History
                  </button>
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsOurClubHovered(true)}
              onMouseLeave={() => setIsOurClubHovered(false)}
            >
              <button
                onClick={() => onNavigate('squad')}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  ['squad', 'hall-of-fame', 'shop', 'fitness-center', 'history', 'our-projects', 'our-foundation', 'sponsor-us'].includes(currentPage)
                    ? 'border-[#F5A623] text-[#F5A623]'
                    : 'border-transparent text-white hover:text-[#F5A623]'
                }`}
              >
                Our Club
                <svg className={`ml-1 w-3 h-3 transition-transform ${isOurClubHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOurClubHovered && (
                <div className="absolute top-full left-0 w-60 bg-[#111] text-white border border-white/15 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {ourClubItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider ${
                        index > 0 ? 'border-t border-white/10' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsTvHovered(true)}
              onMouseLeave={() => setIsTvHovered(false)}
            >
              <button
                onClick={() => onNavigate('tv')}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  ['tv', 'gallery'].includes(currentPage)
                    ? 'border-[#F5A623] text-[#F5A623]'
                    : 'border-transparent text-white hover:text-[#F5A623]'
                }`}
              >
                Eagles TV
                <svg className={`ml-1 w-3 h-3 transition-transform ${isTvHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTvHovered && (
                <div className="absolute top-full left-0 w-44 bg-[#111] text-white border border-white/15 shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {tvItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-white/10 font-bold uppercase text-[11px] tracking-wider ${
                        index > 0 ? 'border-t border-white/10' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  currentPage === item.id ? 'border-[#F5A623] text-[#F5A623]' : 'border-transparent text-white hover:text-[#F5A623]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center space-x-3">
            <div className="flex items-center pl-4 border-l border-white/15">
              <img src="/kampanis.png" alt="Kampanis" className="h-7 sm:h-9 w-auto object-contain" />
            </div>
            <button className="lg:hidden text-white hover:text-[#F5A623]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
