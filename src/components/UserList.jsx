import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UserList = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://freeapi.hashnode.space/api/profile/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;

    try {
      await axios.delete(`https://freeapi.hashnode.space/api/profile/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUsers(users.filter((u) => u._id !== id));
      toast.success('User removed successfully');
    } catch (error) {
      toast.error('Failed to remove user');
    }
  };

  const handleSort = () => {
    const sorted = [...users].sort((a, b) =>
      sortAsc
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );
    setUsers(sorted);
    setSortAsc(!sortAsc);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
          <button
            onClick={handleSort}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sort by Name ({sortAsc ? 'A-Z' : 'Z-A'})
          </button>
        </div>

        <div className="space-y-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="font-semibold">{u.username}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-xs text-gray-400">Role: {u.role}</p>
              </div>

              <button
                onClick={() => handleRemove(u._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;