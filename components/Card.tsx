
import React from 'react';
import { NewsItem } from '../types';

interface CardProps {
  item: NewsItem;
  overlayTitle?: boolean;
}

const Card: React.FC<CardProps> = ({ item, overlayTitle }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-video bg-gray-200">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#F5A623]/90 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {item.duration && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 font-bold">
            {item.duration}
          </span>
        )}
        
        {overlayTitle && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-extrabold text-xl uppercase leading-tight">
              {item.title}
            </h3>
            {item.description && (
               <p className="text-gray-300 text-sm mt-1 line-clamp-2">{item.description}</p>
            )}
          </div>
        )}
      </div>
      {!overlayTitle && (
        <div className="py-3">
          <h3 className="font-bold text-sm uppercase leading-tight group-hover:text-[#db0007] transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center mt-2 space-x-2 text-[10px] text-gray-500 uppercase font-bold">
            <span className="bg-gray-200 px-1 py-0.5">{item.type}</span>
            {item.date && <span>{item.date}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
