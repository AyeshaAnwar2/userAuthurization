import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center text-red-600 mt-10">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-6 shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Your Profile</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="capitalize">{user.role}</span>
        </p>
        <p>
          <strong>User ID:</strong> {user._id}
        </p>
      </div>
    </div>
  );
};

export default Profile;