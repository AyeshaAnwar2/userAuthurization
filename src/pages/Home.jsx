import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl text-center space-y-4">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.username || "Guest"}!
      </h1>

      {user ? (
        <>
          <p className="text-gray-600">
            You're logged in as <strong>{user?.role}</strong>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Link
              to="/profile"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Profile
            </Link>

            <Link
              to="/update"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Update Info
            </Link>

            {user?.role?.toLowerCase() === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Admin Panel
                </Link>

                <Link
                  to="/users"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  View All Users
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
        </>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;