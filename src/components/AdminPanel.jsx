import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
       ` ${import.meta.env.VITE_API_BASE_URL}`/registerUser,
        formData
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("User added successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
        });
      } else {
        toast.error("Failed to add user.");
      }
    } catch (error) {
      toast.error("Error adding user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">Admin Panel</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;