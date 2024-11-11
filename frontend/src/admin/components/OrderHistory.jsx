// src/components/OrderHistory.js
import React, { useState } from 'react'; // Ensure useState is imported
import Sidebar from "./Sidebar";
import "../styles/OrderHistory.css"; // Import the CSS file for OrderHistory

const OrderHistory = () => {

      // State to manage popups
      const [showCheckOrder, setShowCheckOrder] = useState(false);
      const [showViewOrder, setShowViewOrder] = useState(false);
      const [showChangeStatus, setShowChangeStatus] = useState(false);
    
      // Functions to toggle modals
      const toggleCheckOrder = () => setShowCheckOrder(!showCheckOrder);
      const toggleViewOrder = () => setShowViewOrder(!showViewOrder);
      const toggleChangeStatus = () => setShowChangeStatus(!showChangeStatus);
      
  return (
    <div className="order-history-container">
      <Sidebar />
      <main className="main-content">
        <h2 style={{ fontWeight: 'bold' }}>Order History</h2>
        <table>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Username</th>
                                <th>Time</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Sonam Dorji</td>
                                <td>13:01-05-09-2024</td>
                                <td>
                                    <a href="#" className="link" onClick={toggleCheckOrder}>
                                        Check Order
                                    </a>
                                </td>
                                <td>
                                    <span className="order-status">Order Paid</span>
                                </td>
                                <td>
                                    <a href="#" className="link" onClick={toggleViewOrder}>
                                        View Order
                                    </a>
                                    <br />
                                    <br />
                                    <a href="#" className="link" onClick={toggleChangeStatus}>
                                        Change Status
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
      </main>

                  {/* Check Order Popup */}
                  {showCheckOrder && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={toggleCheckOrder}>
                            &times;
                        </span>
                        <h2>Stocked</h2>
                        <p>Rose X 4</p>
                        <p>Sunflower X 1</p>
                        <p>Bouquet id : 1</p>
                        <h3>Customized Bouquet</h3>
                        <img src="/assets/images/flower1.png" alt="Bouquet" />
                    </div>
                </div>
            )}

            {/* View Order Popup */}
            {showViewOrder && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={toggleViewOrder}>
                            &times;
                        </span>
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Username</th>
                                    <th>Order</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sonam Dorji</td>
                                    <td>Stocked</td>
                                    <td>Order Completed</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Time: 13:01-05-09-2024</p>
                        <p>Email: Sonam@gmail.com</p>
                    </div>
                </div>
            )}

            {/* Change Status Popup */}
            {showChangeStatus && (
                <div className="popup">
                    <div className="popup-change">
                        <span className="close" onClick={toggleChangeStatus}>
                            &times;
                        </span>
                        <br />
                        <p>Revert back to Order in Delivery ?</p>
                        <button onClick={() => console.log("Status changed to Order in Delivery")}>Yes</button>
                        <button onClick={toggleChangeStatus}>No</button>
                    </div>
                </div>
            )}

    </div>
  );
};

export default OrderHistory;
