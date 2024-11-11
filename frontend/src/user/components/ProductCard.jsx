// src/components/ProductCard.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { AuthContext } from '../../AuthContext';
import LoginPromptModal from './LoginPromptModal';
import cartIcon from '../../assets/images/Vector.png'; // Import the cart icon

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({
        ...product,
        quantity: 1,
      });
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg ">
      <Link to={`/product/${product.id}`}>
        <div className="relative w-full h-60 mb-2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
        </div>
        <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
      </Link>

      {/* Price and Add to Cart on the same line */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">BTN {product.price}</p>
        <div
          onClick={handleAddToCart}
          className="text-[#ff8f52] cursor-pointer flex items-center"
        >
          <img src={cartIcon} alt="Cart Icon" className="w-5 h-5 mr-2" />
          <span>Add to Cart</span>
        </div>
      </div>

      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
};

export default ProductCard;
