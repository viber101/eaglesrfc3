import React, { useEffect, useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isOurClubHovered, setIsOurClubHovered] = useState(false);
  const [isTvHovered, setIsTvHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileOurClubOpen, setIsMobileOurClubOpen] = useState(false);
  const [isMobileTvOpen, setIsMobileTvOpen] = useState(false);
  const promoMessage = "Buy an Eagles Membership Card for as low as 100,000 UGX & enjoy up to 20% off in 20+ departmental stores. 20% of the proceeds support a child's education.";

  const resetMobileMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileOurClubOpen(false);
    setIsMobileTvOpen(false);
  };

  const navigateToPage = (page: string) => {
    onNavigate(page);
    resetMobileMenus();
  };

  const scrollToAboutSection = (sectionId: string) => {
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const navigateToAboutSection = (sectionId: string) => {
    onNavigate('about');
    scrollToAboutSection(sectionId);
  };

  const navigateToAboutSectionMobile = (sectionId: string) => {
    onNavigate('about');
    resetMobileMenus();
    scrollToAboutSection(sectionId);
  };

  useEffect(() => {
    const closeMobileMenuOnDesktop = () => {
      if (window.innerWidth >= 1024) {
        resetMobileMenus();
      }
    };

    window.addEventListener('resize', closeMobileMenuOnDesktop);
    return () => window.removeEventListener('resize', closeMobileMenuOnDesktop);
  }, []);

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
    { name: 'Membership', id: 'membership' },
    { name: 'Other Services', id: 'other-services' },
    { name: 'Player Sponsor', id: 'contact' }
  ];

  const tvItems = [
    { name: 'Eagles TV', id: 'tv' },
    { name: 'Gallery', id: 'gallery' }
  ];
  const getDesktopItemClass = (active: boolean) => (
    `h-[44px] flex items-center px-4 rounded-full transition-all duration-200 ${
      active
        ? 'bg-[#F5A623] text-black shadow-[0_6px_16px_rgba(245,166,35,0.35)]'
        : 'text-white/90 hover:text-white hover:bg-white/10'
    }`
  );

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_14px_34px_rgba(0,0,0,0.35)]">
      <style>{`
        @keyframes promo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="bg-[linear-gradient(90deg,#0a0a0a,#111827,#0a0a0a)] text-white border-b border-[#F5A623]/30 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-12">
          <div className="relative h-8 flex items-center overflow-hidden">
            <div
              className="flex items-center whitespace-nowrap font-semibold tracking-wide text-[10px]"
              style={{ animation: 'promo-marquee 24s linear infinite', width: 'max-content' }}
            >
              <span className="mx-8">{promoMessage}</span>
              <span className="mx-8">{promoMessage}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#06080d]/95 backdrop-blur text-white border-b border-white/10">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-8 flex items-center h-[88px] relative">
          <div
            className="flex items-center justify-center px-3 sm:px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] mr-6 lg:mr-8 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/KINTANTE FUN DAY FLYER.png"
              alt="Eagles RFC Logo"
              className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-2 uppercase text-[12px] font-semibold tracking-[0.06em]">
            <button
              onClick={() => navigateToPage('home')}
              className={getDesktopItemClass(currentPage === 'home')}
            >
              Home
            </button>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
            >
              <button
                onClick={() => navigateToPage('about')}
                className={getDesktopItemClass(currentPage === 'about' || currentPage === 'history')}
              >
                About
                <svg className={`ml-1 w-3 h-3 transition-transform ${isAboutHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isAboutHovered && (
                <div className="absolute top-[calc(100%+10px)] left-0 w-56 bg-[#0f172a]/95 text-white border border-[#F5A623]/30 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
                  <button
                    onClick={() => navigateToPage('about')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em]"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('vision')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] border-t border-white/10"
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('mission')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] border-t border-white/10"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('core-values')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] border-t border-white/10"
                  >
                    Core Values
                  </button>
                  <button
                    onClick={() => navigateToAboutSection('home-ground')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] border-t border-white/10"
                  >
                    Home Ground
                  </button>
                  <button
                    onClick={() => navigateToPage('history')}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] border-t border-white/10"
                  >
                    Our History
                  </button>
                </div>
              )}
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsOurClubHovered(true)}
              onMouseLeave={() => setIsOurClubHovered(false)}
            >
              <button
                onClick={() => navigateToPage('squad')}
                className={getDesktopItemClass(['squad', 'hall-of-fame', 'shop', 'fitness-center', 'history', 'our-projects', 'our-foundation', 'sponsor-us'].includes(currentPage))}
              >
                Our Club
                <svg className={`ml-1 w-3 h-3 transition-transform ${isOurClubHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOurClubHovered && (
                <div className="absolute top-[calc(100%+10px)] left-0 w-60 bg-[#0f172a]/95 text-white border border-[#F5A623]/30 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
                  {ourClubItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] ${
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
              className="relative flex items-center"
              onMouseEnter={() => setIsTvHovered(true)}
              onMouseLeave={() => setIsTvHovered(false)}
            >
              <button
                onClick={() => navigateToPage('tv')}
                className={getDesktopItemClass(['tv', 'gallery'].includes(currentPage))}
              >
                Eagles TV
                <svg className={`ml-1 w-3 h-3 transition-transform ${isTvHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTvHovered && (
                <div className="absolute top-[calc(100%+10px)] left-0 w-44 bg-[#0f172a]/95 text-white border border-[#F5A623]/30 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
                  {tvItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] ${
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
                onClick={() => navigateToPage(item.id)}
                className={getDesktopItemClass(currentPage === item.id)}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center space-x-3">
            <div className="flex items-center pl-2 sm:pl-4 border-l border-white/15">
              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                <img src="/kampanis.png" alt="Kampanis" className="h-6 sm:h-8 w-auto object-contain" />
              </div>
            </div>
            <button
              className="lg:hidden text-white hover:text-[#F5A623] bg-white/5 border border-white/15 rounded-lg p-2"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 6l12 12M18 6l-12 12" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0b1020]">
            <nav className="px-4 py-3 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => navigateToPage('home')}
                className={`w-full text-left py-3 uppercase text-xs font-semibold tracking-[0.08em] border-b border-white/10 ${
                  currentPage === 'home' ? 'text-[#F5A623]' : 'text-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setIsMobileAboutOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/10"
                aria-expanded={isMobileAboutOpen}
              >
                About
                <svg className={`w-4 h-4 transition-transform ${isMobileAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileAboutOpen && (
                <div className="pl-3 pb-2 border-b border-white/10">
                  <button onClick={() => navigateToPage('about')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">About Us</button>
                  <button onClick={() => navigateToAboutSectionMobile('vision')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">Vision</button>
                  <button onClick={() => navigateToAboutSectionMobile('mission')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">Mission</button>
                  <button onClick={() => navigateToAboutSectionMobile('core-values')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">Core Values</button>
                  <button onClick={() => navigateToAboutSectionMobile('home-ground')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">Home Ground</button>
                  <button onClick={() => navigateToPage('history')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85">Our History</button>
                </div>
              )}

              <button
                onClick={() => setIsMobileOurClubOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/10"
                aria-expanded={isMobileOurClubOpen}
              >
                Our Club
                <svg className={`w-4 h-4 transition-transform ${isMobileOurClubOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileOurClubOpen && (
                <div className="pl-3 pb-2 border-b border-white/10">
                  {ourClubItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsMobileTvOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/10"
                aria-expanded={isMobileTvOpen}
              >
                Eagles TV
                <svg className={`w-4 h-4 transition-transform ${isMobileTvOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileTvOpen && (
                <div className="pl-3 pb-2 border-b border-white/10">
                  {tvItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white/85"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`w-full text-left py-3 uppercase text-xs font-semibold tracking-[0.08em] border-b border-white/10 ${
                    currentPage === item.id ? 'text-[#F5A623]' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
