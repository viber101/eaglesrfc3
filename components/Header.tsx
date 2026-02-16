
import React, { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Squad', id: 'squad' },
    { name: 'Shop', id: 'shop' },
    { name: 'Eagles TV', id: 'tv' },
    { name: 'Donate', id: 'donate' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top micro nav */}
      <div className="bg-[#1a1a1a] text-white py-1">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-12 flex justify-between text-[11px] font-bold uppercase tracking-wider">
          <div className="flex space-x-6">
            <span className="hover:text-red-500 transition-colors cursor-pointer">Arsenal.com</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Shop</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Hospitality</span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-red-500 transition-colors cursor-pointer">Accessibility</span>
            <span className="hover:text-red-500 transition-colors cursor-pointer">Login</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-[#db0007] text-white h-16 shadow-lg">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-12 flex items-center h-full relative">
          <div 
            className="flex items-center space-x-2 mr-10 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" 
              alt="Arsenal Logo" 
              className="h-14 py-1 filter drop-shadow-md"
            />
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8 uppercase text-sm font-extrabold tracking-tighter h-full">
            <button
              onClick={() => onNavigate('home')}
              className={`h-full flex items-center px-1 transition-all border-b-4 ${
                currentPage === 'home' ? 'border-white' : 'border-transparent hover:opacity-80'
              }`}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
            >
              <button
                onClick={() => onNavigate('about')}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  currentPage === 'about' || currentPage === 'history' ? 'border-white' : 'border-transparent hover:opacity-80'
                }`}
              >
                About
                <svg className={`ml-1 w-3 h-3 transition-transform ${isAboutHovered ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isAboutHovered && (
                <div className="absolute top-full left-0 w-48 bg-white text-black shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button 
                    onClick={() => onNavigate('about')}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 font-bold uppercase text-[11px] tracking-wider"
                  >
                    About Us
                  </button>
                  <button 
                    onClick={() => onNavigate('history')}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 font-bold uppercase text-[11px] tracking-wider border-t border-gray-100"
                  >
                    Our History
                  </button>
                </div>
              )}
            </div>

            {menuItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`h-full flex items-center px-1 transition-all border-b-4 ${
                  currentPage === item.id ? 'border-white' : 'border-transparent hover:opacity-80'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center space-x-6">
             <div className="hidden xl:flex items-center space-x-4 opacity-90">
                <span className="text-[10px] uppercase font-bold text-white/70">Partners</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" className="h-4 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Emirates_Logo.svg/2560px-Emirates_Logo.svg.png" alt="Emirates" className="h-6 invert" />
             </div>
             <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </button>
             <button className="lg:hidden text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
