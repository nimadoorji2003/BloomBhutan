// pages/Florals.js
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import productData from '../data/productData'; // Use productData

const Florals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // Sorting state

  // Function to filter products based on search term
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to sort products based on sortOrder
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'price-asc') {
      return a.price - b.price; // Sort by price, cheapest to most expensive
    } else if (sortOrder === 'price-desc') {
      return b.price - a.price; // Sort by price, most expensive to cheapest
    } else if (sortOrder === 'newest') {
      return b.id - a.id; // Sort by newest first
    } else if (sortOrder === 'oldest') {
      return a.id - b.id; // Sort by oldest first
    }
    return 0; // Default, no sorting
  });

  return (
    <div className="p-6 mx-16 my-20">
      <h1 className="text-4xl font-bold mb-4">Our Floral Collection</h1>
      
      {/* Search and Sort Filters */}
      <div className="flex justify-between mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        {/* Sort Filter */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-semibold">Sort by:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Default</option>
            <option value="price-asc">Cheap to Expensive</option>
            <option value="price-desc">Expensive to Cheap</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Florals;
