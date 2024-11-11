// src/components/FlowerPanel.js
import React, { useState, useRef } from 'react';
import DraggableFlower from './DraggableFlower';
import flowerData from '../data/flowerData';

const FlowerPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFlowers = flowerData.filter(flower =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="w-full mb-5">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search flowers..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full max-w-lg p-2 mb-2 border border-gray-300 rounded ml-12 mb-8"
      />
      
      {/* Flower Cards with Scroll */}
      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        <button
          className="absolute left-0 bg-white p-2 text-4xl z-10 left-10"
          onClick={scrollLeft}
        >
          &#8249;
        </button>
        
        {/* Flower Cards - Scrollable container */}
        <div
          className="flex overflow-x-auto space-x-4 mx-12 scrollbar-hide justify-start"
          ref={scrollRef}
          style={{ width: '100%', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto' }} // Center the flower cards
        >
          {filteredFlowers.slice(0, 8).map(flower => ( // Limit to 8 flowers visible at a time
            <div key={flower.id} className="flex-shrink-0 w-1/6"> Z
              <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
                <DraggableFlower flower={flower} />
                {/* Flower Name Centered */}
                <p className="text-center mt-2 text-sm font-semibold">{flower.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Scroll Button */}
        <button
          className="absolute right-0 bg-white p-2 text-4xl z-10 right-10"
          onClick={scrollRight}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default FlowerPanel;
