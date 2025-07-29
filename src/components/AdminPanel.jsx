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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://freeapi.hashnode.space/registerUser", formData);
      toast.success("User registered successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.username}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <select
        name="role"
        onChange={handleChange}
        value={formData.role}
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Registering..." : "Register User"}
      </button>
    </form>
  );
};

export default AdminPanel;