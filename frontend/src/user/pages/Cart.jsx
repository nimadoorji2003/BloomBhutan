// pages/Cart.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import paypal from '../../assets/images/paypal.png'
const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.length;

  // Function to handle checkout button press
  const handleCheckout = () => {
    if (totalItems > 0) {
      setIsModalOpen(true); // Open the modal if there are items in the cart
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 flex flex-col md:flex-row">
      {/* Items on the left */}
      <div className="w-full md:w-2/3">
        <h1 className="text-4xl font-bold mb-12 mt-10">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className='h-[40vh]'>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex mb-4 border-b pb-4 ">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>BTN {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total on the right */}
      <div className="w-full md:w-1/3 md:ml-6 mt-6 md:mt-0">
        <h2 className="text-2xl font-bold mb-4 mt-10">Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between font-bold text-xl mb-4">
          <span>Total:</span>
          <span>BTN {totalCost}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={totalItems === 0} 
          className={`px-4 py-2 rounded font-semibold w-full ${
            totalItems === 0 ? 'bg-[#ff8f52] cursor-not-allowed opacity-50' : 'bg-[#ff8f52] text-white'
          }`}
        >
          Checkout
        </button>
      </div>

      {/* Modal for PayPal Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <p className="mb-4">
              PayPal transactions are authorized through the PayPal website.
              Click the button below to initiate the transaction.
            </p>
            <p className="mb-4">You'll have a chance to review your order before it's placed.</p>

            {/* Number of Items and Total Cost */}
            <div className="mb-4">
              <p className="font-semibold">Number of Items: {totalItems}</p>
              <p className="font-semibold">Total Cost: BTN {totalCost}</p>
            </div>

            {/* PayPal Button */}
            {/* add the payment logic here */}
            <div className="flex justify-center mb-4">
              <img
                src={paypal}
                alt="PayPal"
                className="w-32 h-auto"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal} // Call closeModal function to close the modal
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
