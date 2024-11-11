// src/components/UserManager.js
import React, { useState } from "react"; // Import useState
import Sidebar from "./Sidebar";
import "../styles/UserManager.css"; // Import the CSS file for UserManager

const UserManager = () => {
  // State to manage the popup and user details
  const [showPopup, setShowPopup] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  // Sample user data
  const users = [
    { id: 1, username: "Sonam Dorji", email: "gay@gmail.com" },
    { id: 2, username: "Anushia Subba", email: "as@gmail.com" },
    // Add more users as needed
  ];

  // Function to handle removal confirmation
  const handleRemoveUser = (userId) => {
    setUserToRemove(userId);
    setShowPopup(true);
  };

  // Function to confirm removal
  const confirmRemoveUser = () => {
    // Logic to remove the user (this is where you'd update your state or make a request)
    console.log(`User with ID ${userToRemove} removed.`);
    // Close the popup
    setShowPopup(false);
    setUserToRemove(null); // Clear user to remove
  };

  // Function to cancel removal
  const cancelRemoveUser = () => {
    setShowPopup(false);
    setUserToRemove(null); // Clear user to remove
  };

  return (
    <div className="user-manager-container">
      <Sidebar />
      <main className="main-content">
        <h2 style={{ fontWeight: 'bold' }}>User Manager</h2>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <a href="#" className="link" onClick={() => handleRemoveUser(user.id)}>
                      Remove User
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-remove">
              <span className="close" onClick={cancelRemoveUser}>
                &times;
              </span>
              <br />
              <p>Are you sure you want to remove this user?</p>
              <button onClick={confirmRemoveUser}>Yes</button>
              <button onClick={cancelRemoveUser}>No</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManager;
