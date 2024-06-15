import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setProfilePictureUrl(user.profilePictureUrl || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      try {
        const updatedUser = {
          username,
          bio,
          profilePictureUrl,
        };
        await updateDoc(userRef, updatedUser);
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));
        setMessage("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        setMessage("Error updating profile");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="form-container bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 className="font-bold text-3xl mb-6">Profile</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Profile Picture URL"
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
                className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-full border border-red-500 bg-red-500 text-white font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none mt-4"
                disabled={loading}
              >
                Update Profile
              </button>
              {message && (
                <div className="message text-green-500 mt-4">{message}</div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
