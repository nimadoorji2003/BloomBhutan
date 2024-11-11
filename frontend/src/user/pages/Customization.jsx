// src/pages/Customization.js
import React, { useState, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend, TouchTransition, HTML5DragTransition } from 'dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import html2canvas from 'html2canvas';
import FlowerPanel from '../components/FlowerPanel';
import Canvas from '../components/Canvas';
import FlowerTable from '../components/FlowerTable';
import { CartContext } from '../../CartContext';
import { AuthContext } from '../../AuthContext';
import LoginPromptModal from '../components/LoginPromptModal'; // Import the modal

const Customization = () => {
  const [flowersOnCanvas, setFlowersOnCanvas] = useState([]);
  const [highlightedFlowerId, setHighlightedFlowerId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
        transition: HTML5DragTransition,
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        transition: TouchTransition,
      },
    ],
  };

  const totalCost = flowersOnCanvas.reduce((total, flower) => total + flower.price, 0);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const canvasElement = document.querySelector('.canvas');
      html2canvas(canvasElement).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const customBouquet = {
          id: Date.now(),
          name: 'Custom Bouquet',
          image: imageData,
          price: totalCost,
          quantity: 1,
        };
        addToCart(customBouquet);
      });
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-bold my-8">Customize Your Bouquet</h1>
        <FlowerPanel />
        <div className="flex w-full max-w-10xl my-6">
          {/* Left Column */}
          <div className="flex flex-col ml-12 "> 
            {/* Canvas */}
            <Canvas
              flowersOnCanvas={flowersOnCanvas}
              setFlowersOnCanvas={setFlowersOnCanvas}
              highlightedFlowerId={highlightedFlowerId}
            />
            {/* Flower Table */}
            <FlowerTable
              flowersOnCanvas={flowersOnCanvas}
              setFlowersOnCanvas={setFlowersOnCanvas}
              setHighlightedFlowerId={setHighlightedFlowerId}
            />
          </div>
          {/* Cost calculation on the right */}
          <div className="mx-6 w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Your Bouquet</h2>
            <ul className="mb-4">
              {flowersOnCanvas.map((flower, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{flower.name}</span>
                  <span>BTN {flower.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-xl mb-4">
              <span>Total:</span>
              <span>BTN {totalCost}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#ff8f52] text-white px-4 py-2 rounded font-semibold w-full" // Changed button color
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </DndProvider>
  );
};

export default Customization;
