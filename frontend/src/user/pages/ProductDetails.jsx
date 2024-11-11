// pages/ProductDetails.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import flowerData from '../data/productData';
import { CartContext } from '../../CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = flowerData.find((item) => item.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <div className="p-6 flex flex-col md:flex-row">
      <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto object-cover" />
      <div className="md:ml-6 mt-4 md:mt-0">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 text-xl mb-4">BTN {product.price}</p>
        <p className="mb-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
