import React from "react";
import AdminPanel from "../components/AdminPanel";
import UserList from "../components/UserList";

const AdminPage = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Admin Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Register New User */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Register a New User</h3>
          <AdminPanel />
        </div>

        {/* User List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Users</h3>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;