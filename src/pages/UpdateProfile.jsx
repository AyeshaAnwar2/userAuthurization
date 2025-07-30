import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Debug logs
  console.log("User:", user);
  console.log("Sending to:", `https://freeapi.hashnode.space/api/user/${user?.id}`);
  console.log("Token:", user?.token);
  console.log("Data:", {
    username,
    email,
    password: password || undefined,
  });

  try {
    const { data } = await axios.put(
      `https://freeapi.hashnode.space/api/user/${user?.id}`,
      {
        username,
        email,
        password: password || undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    toast.success("Profile updated successfully!");
    setUser({
      ...user,
      username: data.user.username,
      email: data.user.email,
    });
    navigate("/profile");
  } catch (error) {
    console.error("Update Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Your Info</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="New Username"
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="New Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;