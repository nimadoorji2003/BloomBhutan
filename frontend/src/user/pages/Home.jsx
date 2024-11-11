// pages/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import ProductCard from '../components/homeProductCard'; // Import ProductCard component
import productData from '../data/productData'; // Use productData
import heroBanner from '../../assets/images/herobanner.png';
import flower from '../../assets/images/flower.png';
import flower1 from '../../assets/images/flower1.png';
import abstractImage from '../../assets/images/abstract.png'; // Abstract image for left
import aboutImage from '../../assets/images/about.png'; // About Us image
import abstract1Image from '../../assets/images/abstract1.png'; // Abstract image for right

const fadeUp = {
  hidden: { opacity: 0, y: 50 },  // Initial hidden state: down and transparent
  visible: { opacity: 1, y: 0 }   // Final visible state: in place and fully visible
};

const Home = () => {
  const [showAll, setShowAll] = useState(false);

  // Limit display to 4 cards if not showing all
  const productsToShow = showAll ? productData : productData.slice(0, 4);

  const handleToggleView = () => {
    setShowAll(!showAll); // Toggles between showing all or only 4 cards
  };

  return (
    <div className="p-6">
      {/* Hero Banner Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="relative h-[600px] bg-cover bg-center flex items-center justify-start text-left rounded-lg mb-12"
        style={{
          backgroundImage: `url(${heroBanner})`,
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 text-black p-4 ml-8">
          <p className="text-lg font-light">Bringing the Beauty and Charm of Bhutanese Blossoms</p>
          <h1 className="text-8xl font-designer font-bold mb-4">Bloom Bhutan</h1>
          <p className="text-3xl font-light">Every Petal Tells a Story</p>
        </div>
      </motion.div>

      {/* Exclusive Products Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-6 mb-12"
      >
        <div className="text-left mb-8">
          <p className="text-md font-light text-gray-500">Discover the Magic in Every Bloom</p>
          <h2 className="text-5xl font-regular font-bold">Exclusive Products</h2>
        </div>

        <div className="flex gap-12"> {/* Flex layout for cards with gap */}
          {/* Bloom Beauties Card (1/4 width) */}
          <Link to="/florals" className="block w-1/4">
            <div className="relative h-[510px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={flower}
                alt="Bloom Beauties"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl text-black font-semibold text-center">
                Bloom Beauties
              </div>
            </div>
          </Link>

          {/* Personalized Bouquet Card (3/4 width) */}
          <Link to="/customization" className="block w-3/4">
            <div className="relative h-[510px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={flower1}
                alt="Personalized Bouquet"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl text-black font-semibold text-center">
                Get your personalized bouquet
              </div>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Colorful New Arrivals Section with Background Image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-12 mb-12"
      >
        {/* Abstract Background positioned to stick out */}
        <div
          className="absolute top-0 left-0 h-[300px] w-[200px] z-0"
          style={{
            backgroundImage: `url(${abstractImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        <div className="relative z-10 flex justify-between items-center pl-4 pt-16 pr-4 py-6">
          <h2 className="text-4xl font-semibold">Colorful New <br /> Arrivals</h2>
          <button onClick={handleToggleView} className="text-gray-500 text-sm">
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-4">
          {productsToShow.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[250px] h-[300px]" // Ensure card size is 250x300
            />
          ))}
        </div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 relative"
      >
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={aboutImage} // Ensure this is the correct path for about.png
            alt="About Us"
            className="rounded-lg shadow-lg w-[520px] h-[790px] object-cover "
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to Bloom Bhutan, where Bhutanese floral beauty meets expert craftsmanship. 
            Each bouquet is a celebration of nature, crafted to brighten your life and elevate every moment.
          </p>
          <h3 className="text-3xl font-bold mb-4">Mission</h3>
          <ul className="list-decimal pl-6 space-y-2 text-lg">
            <li>Celebrate Bhutanese beauty with exquisite floral arrangements.</li>
            <li>Deliver joy and elegance with every bouquet.</li>
          </ul>
        </div>

        {/* Abstract Image on the Right */}
        <div
          className="absolute top-0 right-0 h-[350px] w-[240px] z-0"
          style={{
            backgroundImage: `url(${abstract1Image})`, // New abstract1 image on the right
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default Home;
