import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = ({ setIsAuthenticated, setIsAdmin }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editBio, setEditBio] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditPosition(user.position);
    setEditBio(user.bio);
  };

  const handleSaveUser = () => {
    const updatedUsers = users.map((user) =>
      user.email === editingUser.email ? { ...user, name: editName, position: editPosition, bio: editBio } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    alert('User updated successfully');
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('User deleted successfully');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#0f172a] via-[#0b0b0d] to-[#111827] min-h-screen w-full relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 -right-36 w-80 h-80 bg-amber-400/20 blur-3xl rounded-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-4 sm:mb-0">User Management</h2>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:from-rose-400 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition"
        >
          Logout
        </button>
      </div>

      {editingUser ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-2xl shadow-2xl mb-6 w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">Edit User</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          />
          <input
            type="text"
            value={editPosition}
            onChange={(e) => setEditPosition(e.target.value)}
            placeholder="Position"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          />
          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            placeholder="Bio"
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          ></textarea>
          <button
            onClick={handleSaveUser}
            className="w-full py-3 mt-4 bg-blue-400 text-gray-900 font-semibold rounded-xl hover:from-emerald-300 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <thead>
              <tr className="text-yellow-400 text-left">
                <th className="p-4 text-sm md:text-base">Name</th>
                <th className="p-4 text-sm md:text-base">Email</th>
                <th className="p-4 text-sm md:text-base">Position</th>
                <th className="p-4 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="text-gray-200 border-t border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 text-sm md:text-base">{user.name}</td>
                  <td className="p-4 text-sm md:text-base">{user.email}</td>
                  <td className="p-4 text-sm md:text-base">{user.position}</td>
                  <td className="p-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 bg-blue-400 text-white rounded-lg hover:from-blue-400 hover:to-cyan-400 transition w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:from-rose-400 hover:to-orange-400 transition w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
