
import React from 'react';

interface SectionHeaderProps {
  title: string;
  showSeeMore?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, showSeeMore = true }) => {
  return (
    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
      <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-gray-900">{title}</h2>
      {showSeeMore && (
        <button className="bg-[#db0007] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider hover:bg-black transition-colors">
          See More
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
