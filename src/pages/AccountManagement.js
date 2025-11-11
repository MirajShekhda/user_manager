import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountManagement = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { currentUser, logout, updateCurrentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setProfilePicture(currentUser.profilePicture || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/avatar.png");
      setCoverPhoto(currentUser.coverPhoto || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cookies.jpg");
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const updateUserInStorage = (updatedUser) => {
    // Delegate to AuthContext to keep state + storage in sync
    updateCurrentUser(updatedUser);
  };

  const handleSave = () => {
    const updatedUser = { ...user, profilePicture, coverPhoto };
    setUser(updatedUser);
    updateUserInStorage(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePicture = reader.result;
        setProfilePicture(newProfilePicture);
        setUser((prev) => ({ ...prev, profilePicture: newProfilePicture }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCoverPhoto = reader.result;
        setCoverPhoto(newCoverPhoto);
        setUser((prev) => ({ ...prev, coverPhoto: newCoverPhoto }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b0b0d] to-[#111827] px-4 relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-28 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-fuchsia-500/20 blur-3xl rounded-full"></div>
      </div>

      <div className={`rounded-xl shadow-2xl ${isEditing ? 'w-full max-w-4xl flex flex-col md:flex-row bg-white/10 backdrop-blur-xl border border-white/20' : 'w-80 bg-white/10 backdrop-blur-xl border border-white/20'}`}>
        {/* Cover + Avatar */}
        <div className={`relative ${isEditing ? 'flex flex-col items-center md:w-1/3 bg-white/5 p-4' : ''}`}>
          <div className={`${isEditing ? 'w-full h-32 bg-white/10 rounded-lg overflow-hidden mb-4' : 'w-full h-40 rounded-t-xl overflow-hidden'}`}>
            {coverPhoto ? (
              <img src={coverPhoto} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300"></div>
            )}
          </div>

          <div className={`${isEditing ? 'w-24 h-24 -mt-12 mb-4' : '-mt-12'} w-20 h-20 bg-gray-400 rounded-full overflow-hidden border-4 border-white/80 shadow-md mx-auto ring-2 ring-fuchsia-300/40`}>
            <img src={profilePicture} alt="avatar" className="w-full h-full object-cover" />
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`${isEditing ? 'absolute bottom-4 right-4' : 'absolute top-2 right-2'} w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-400 hover:to-cyan-400 shadow-lg`}
            title="Edit Profile"
          >
            {/* Inline SVG pencil icon (replaces material-icons span) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10.232-10.232a2 2 0 10-2.828-2.828L5.172 17.172a4 4 0 00-1.172 2.828V20z"/>
            </svg>
          </button>
        </div>

        <div className={`${isEditing ? 'p-6 md:w-2/3' : 'text-center p-4 text-white'}`}>
          {isEditing ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={user.position}
                  onChange={(e) => setUser({ ...user, position: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Position"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  value={user.dob || ''}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Bio"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-500 mb-2">Change Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="w-full p-2 bg-gray-100 rounded focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2">Change Cover Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                  className="w-full p-2 bg-gray-100 rounded focus:outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 mt-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-gray-900 font-semibold rounded-xl hover:from-emerald-300 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition duration-300"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-sm text-gray-300 mb-4">{user.position}</div>
              <p className="text-gray-200 text-sm mb-4">{user.bio}</p>
              <p className="text-gray-300 text-sm">
                Date of Birth: {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
              </p>
            </>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 mt-4 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-rose-400 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
