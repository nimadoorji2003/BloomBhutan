import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/UserManager.css"; // Import the CSS file for UserManager

const UserManager = () => {
  // State to manage the popup and user details
  const [showPopup, setShowPopup] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [users, setUsers] = useState([]); // State to store the users
  const [error, setError] = useState(null); // State to handle errors

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data); // Update the state with the fetched users
      } catch (err) {
        setError(err.message); // Handle error if the API request fails
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Function to handle removal confirmation
  const handleRemoveUser = (userId) => {
    setUserToRemove(userId);
    setShowPopup(true);
  };

  // Function to confirm removal
  const confirmRemoveUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/users/${userToRemove}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user from the UI list after successful deletion
      setUsers(users.filter((user) => user._id !== userToRemove));

      // Close the popup
      setShowPopup(false);
      setUserToRemove(null); // Clear user to remove
    } catch (err) {
      setError(err.message); // Handle error if the API request fails
      setShowPopup(false); // Close the popup on error
    }
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
        <h2 style={{ fontWeight: "bold" }}>User Manager</h2>

        {/* Display error message if there's an error */}
        {error && <p className="error">{error}</p>}

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
              {users.map((user, index) => (
                <tr key={user._id}>
                  {" "}
                  {/* Using _id from MongoDB as the key */}
                  <td>{index + 1}</td> {/* Display index as Sl.No */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <a
                      href="#"
                      className="link"
                      onClick={() => handleRemoveUser(user._id)}
                    >
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
