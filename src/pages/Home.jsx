import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <div className="text-center mt-10">Loading user data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username} 👋</h1>
      <p className="mb-4">
        You are logged in as:{" "}
        <span className="font-semibold capitalize">{user.role}</span>
      </p>
      <p className="mb-4">Email: {user.email}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <Link to="/update-profile">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Your Info
          </button>
        </Link>

        {user.role === "ADMIN" && (
          <>
            <Link to="/ADMIN">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Admin Panel
              </button>
            </Link>
            <Link to="/ManageUsers">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Manage Users
              </button>
            </Link>
            <Link to="/AddUser">
              <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                Add User
              </button>
            </Link>
          </>
        )}
    
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;