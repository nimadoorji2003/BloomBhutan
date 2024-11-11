// src/components/homeProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="relative w-[280px] h-[370px] overflow-hidden rounded-lg shadow-lg">
      <Link to={`/product/${product.id}`}>
        {/* Image with dark overlay */}
        <div className="relative w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover filter brightness-75" // Darken the image
          />
          {/* Text centered at the bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-white text-xl font-semibold mb-4">
            {product.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
