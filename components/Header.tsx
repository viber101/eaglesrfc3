import React, { useEffect, useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isOurClubHovered, setIsOurClubHovered] = useState(false);
  const [isAboutSubHovered, setIsAboutSubHovered] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isTvHovered, setIsTvHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOurClubOpen, setIsMobileOurClubOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isMobileTvOpen, setIsMobileTvOpen] = useState(false);
  const promoMessage = "Buy an Eagles Membership Card for as low as 100,000 UGX & enjoy up to 20% off in 20+ departmental stores. 20% of the proceeds support a child's education.";

  const resetMobileMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileOurClubOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileShopOpen(false);
    setIsMobileTvOpen(false);
  };

  const navigateToPage = (page: string) => {
    onNavigate(page);
    resetMobileMenus();
  };

  const scrollToSection = (sectionId: string) => {
    const maxAttempts = 12;
    const headerOffset = 120;

    const scrollWithOffset = (target: HTMLElement) => {
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    };

    const tryScroll = (attempt = 0) => {
      const target = document.getElementById(sectionId);
      if (!target) {
        if (attempt < maxAttempts) {
          window.setTimeout(() => tryScroll(attempt + 1), 60);
        }
        return;
      }

      scrollWithOffset(target);

      if (attempt === 0) {
        window.setTimeout(() => scrollWithOffset(target), 170);
      }
    };

    window.setTimeout(() => tryScroll(), 120);
  };

  const navigateToAboutSection = (sectionId: string) => {
    onNavigate('about');
    scrollToSection(sectionId);
  };

  const navigateToAboutSectionMobile = (sectionId: string) => {
    onNavigate('about');
    resetMobileMenus();
    scrollToSection(sectionId);
  };

  const navigateToShopSection = (sectionId: string) => {
    if (currentPage !== 'shop') {
      onNavigate('shop');
    }
    scrollToSection(sectionId);
  };

  const navigateToShopSectionMobile = (sectionId: string) => {
    if (currentPage !== 'shop') {
      onNavigate('shop');
    }
    resetMobileMenus();
    scrollToSection(sectionId);
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

  const shopItems = [
    { name: 'Merchandise', id: 'shop-merchandise' },
    { name: 'Footwear', id: 'shop-footwear' },
    { name: 'Shoe Care', id: 'shop-shoe-care' }
  ];
  const getDesktopItemClass = (active: boolean) => (
    `h-[42px] flex items-center px-1 border-b-[3px] transition-colors duration-200 ${
      active
        ? 'text-white border-[#F5A623]'
        : 'text-white border-transparent hover:border-[#F5A623]/70'
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
              className="flex items-center whitespace-nowrap font-semibold tracking-wide text-[10px] pr-32 sm:pr-36"
              style={{ animation: 'promo-marquee 24s linear infinite', width: 'max-content' }}
            >
              <span className="mx-8">{promoMessage}</span>
              <span className="mx-8">{promoMessage}</span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center pl-3 pr-1 sm:pr-2 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent">
              <div className="rounded-md bg-[#0b1221]/85 border border-white/20 px-2 py-1">
                <img src="/kampanis.png" alt="Kampanis" className="h-4 sm:h-5 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#05070c] backdrop-blur text-white border-b border-white/10">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-8 flex items-center h-[72px] relative">
          <div
            className="flex items-center justify-center px-2 sm:px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] mr-6 lg:mr-8 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/KINTANTE FUN DAY FLYER.png"
              alt="Eagles RFC Logo"
              className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-6 uppercase text-[13px] font-black tracking-[0.04em]">
            <button
              onClick={() => navigateToPage('home')}
              className={getDesktopItemClass(currentPage === 'home')}
            >
              Home
            </button>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <button
                onClick={() => navigateToPage('shop')}
                className={getDesktopItemClass(currentPage === 'shop')}
              >
                Shop
                <svg className={`ml-1 w-3.5 h-3.5 text-[#F5A623] transition-transform ${isShopHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isShopHovered && (
                <div className="absolute top-full left-0 w-52 bg-[#0f172a]/95 text-white border border-[#F5A623]/40 rounded-md shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
                  {shopItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToShopSection(item.id)}
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
              onMouseEnter={() => setIsOurClubHovered(true)}
              onMouseLeave={() => setIsOurClubHovered(false)}
            >
              <button
                onClick={() => navigateToPage('squad')}
                className={getDesktopItemClass(['about', 'history', 'squad', 'hall-of-fame', 'fitness-center', 'our-projects', 'our-foundation', 'sponsor-us'].includes(currentPage))}
              >
                Our Club
                <svg className={`ml-1 w-3.5 h-3.5 text-[#F5A623] transition-transform ${isOurClubHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOurClubHovered && (
                <div className="absolute top-full left-0 w-60 bg-[#0f172a]/95 text-white border border-[#F5A623]/40 rounded-md shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsAboutSubHovered(true)}
                    onMouseLeave={() => setIsAboutSubHovered(false)}
                  >
                    <button
                      onClick={() => navigateToPage('about')}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em]"
                    >
                      About
                      <svg className={`ml-2 w-3.5 h-3.5 text-[#F5A623] transition-transform ${isAboutSubHovered ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {isAboutSubHovered && (
                      <div className="absolute top-0 left-full ml-2 w-56 bg-[#0f172a]/95 text-white border border-[#F5A623]/40 rounded-md shadow-2xl py-2 animate-in fade-in slide-in-from-left-2 duration-200 backdrop-blur">
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
                  {ourClubItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-white/10 font-semibold uppercase text-[10px] tracking-[0.08em] ${
                        index > -1 ? 'border-t border-white/10' : ''
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
                <svg className={`ml-1 w-3.5 h-3.5 text-[#F5A623] transition-transform ${isTvHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTvHovered && (
                <div className="absolute top-full left-0 w-44 bg-[#0f172a]/95 text-white border border-[#F5A623]/40 rounded-md shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur">
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
            <button
              className="lg:hidden text-white hover:text-[#F5A623] bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-[11px] uppercase font-semibold tracking-[0.08em]"
              onClick={() => navigateToPage('shop')}
            >
              Shop
            </button>
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
          <div className="lg:hidden border-t border-white/20 bg-black">
            <nav className="px-4 py-3 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => navigateToPage('home')}
                className={`w-full text-left py-3 uppercase text-xs font-semibold tracking-[0.08em] border-b border-white/15 ${
                  currentPage === 'home' ? 'text-white' : 'text-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setIsMobileShopOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/15"
                aria-expanded={isMobileShopOpen}
              >
                Shop
                <svg className={`w-4 h-4 transition-transform ${isMobileShopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileShopOpen && (
                <div className="pl-3 pb-2 border-b border-white/15">
                  {shopItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToShopSectionMobile(item.id)}
                      className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsMobileOurClubOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/15"
                aria-expanded={isMobileOurClubOpen}
              >
                Our Club
                <svg className={`w-4 h-4 transition-transform ${isMobileOurClubOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileOurClubOpen && (
                <div className="pl-3 pb-2 border-b border-white/15">
                  <button
                    onClick={() => setIsMobileAboutOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between py-2 uppercase text-[11px] font-semibold text-white"
                    aria-expanded={isMobileAboutOpen}
                  >
                    About
                    <svg className={`w-3.5 h-3.5 transition-transform ${isMobileAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobileAboutOpen && (
                    <div className="pl-3 pb-2">
                      <button onClick={() => navigateToPage('about')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">About Us</button>
                      <button onClick={() => navigateToAboutSectionMobile('vision')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">Vision</button>
                      <button onClick={() => navigateToAboutSectionMobile('mission')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">Mission</button>
                      <button onClick={() => navigateToAboutSectionMobile('core-values')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">Core Values</button>
                      <button onClick={() => navigateToAboutSectionMobile('home-ground')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">Home Ground</button>
                      <button onClick={() => navigateToPage('history')} className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white">Our History</button>
                    </div>
                  )}
                  {ourClubItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsMobileTvOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 uppercase text-xs font-semibold tracking-[0.08em] text-white border-b border-white/15"
                aria-expanded={isMobileTvOpen}
              >
                Eagles TV
                <svg className={`w-4 h-4 transition-transform ${isMobileTvOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileTvOpen && (
                <div className="pl-3 pb-2 border-b border-white/15">
                  {tvItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToPage(item.id)}
                      className="w-full text-left py-2 uppercase text-[11px] font-semibold text-white"
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
                  className={`w-full text-left py-3 uppercase text-xs font-semibold tracking-[0.08em] border-b border-white/15 ${
                    currentPage === item.id ? 'text-white' : 'text-white'
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



