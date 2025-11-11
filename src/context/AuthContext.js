import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

const demoUsers = [
  { name: "Miraj Patel", email: "miraj@example.com", password: "miraj123", position: "Software Engineer", bio: "Loves coding.", profilePicture: "https://randomuser.me/api/portraits/men/1.jpg", coverPhoto: "https://picsum.photos/800/200?random=1", dob: "1990-05-15" },
  { name: "Amit Sharma", email: "amit@example.com", password: "amit123", position: "Product Manager", bio: "Building products.", profilePicture: "https://randomuser.me/api/portraits/men/2.jpg", coverPhoto: "https://picsum.photos/800/200?random=2", dob: "1988-03-22" },
  { name: "Priya Singh", email: "priya@example.com", password: "priya123", position: "UX Designer", bio: "User-friendly designs.", profilePicture: "https://randomuser.me/api/portraits/women/3.jpg", coverPhoto: "https://picsum.photos/800/200?random=3", dob: "1992-07-08" },
  { name: "Rohit Verma", email: "rohit@example.com", password: "rohit123", position: "Data Scientist", bio: "Loves data.", profilePicture: "https://randomuser.me/api/portraits/men/4.jpg", coverPhoto: "https://picsum.photos/800/200?random=4", dob: "1985-12-04" },
  { name: "Neha Patel", email: "neha@example.com", password: "neha123", position: "Backend Developer", bio: "Server-side apps.", profilePicture: "https://randomuser.me/api/portraits/women/5.jpg", coverPhoto: "https://picsum.photos/800/200?random=5", dob: "1991-10-20" },
  { name: "Sanjay Kapoor", email: "sanjay@example.com", password: "sanjay123", position: "DevOps Engineer", bio: "CI/CD expert.", profilePicture: "https://randomuser.me/api/portraits/men/6.jpg", coverPhoto: "https://picsum.photos/800/200?random=6", dob: "1987-09-30" },
  { name: "Anjali Reddy", email: "anjali@example.com", password: "anjali123", position: "Frontend Developer", bio: "Responsive UIs.", profilePicture: "https://randomuser.me/api/portraits/women/7.jpg", coverPhoto: "https://picsum.photos/800/200?random=7", dob: "1994-06-25" },
  { name: "Vikram Joshi", email: "vikram@example.com", password: "vikram123", position: "QA Engineer", bio: "Software quality.", profilePicture: "https://randomuser.me/api/portraits/men/8.jpg", coverPhoto: "https://picsum.photos/800/200?random=8", dob: "1986-11-12" },
  { name: "Isha Mehta", email: "isha@example.com", password: "isha123", position: "Content Writer", bio: "Engaging content.", profilePicture: "https://randomuser.me/api/portraits/women/9.jpg", coverPhoto: "https://picsum.photos/800/200?random=9", dob: "1993-08-19" },
  { name: "Arjun Nair", email: "arjun@example.com", password: "arjun123", position: "Mobile Developer", bio: "iOS/Android apps.", profilePicture: "https://randomuser.me/api/portraits/men/10.jpg", coverPhoto: "https://picsum.photos/800/200?random=10", dob: "1990-01-17" }
];

function initializeDemoUsers() {
  const DEMO_SEED_KEY = 'demoSeeded_v1';
  try {
    const seeded = localStorage.getItem(DEMO_SEED_KEY);
    if (seeded) return;

    const existing = JSON.parse(localStorage.getItem('users') || '[]');
    const shouldSeed = !Array.isArray(existing) || existing.length === 0;

    if (shouldSeed) {
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }
    localStorage.setItem(DEMO_SEED_KEY, 'true');
  } catch (err) {
    console.error('Failed to seed demo users:', err);
  }
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initializeDemoUsers();

    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const admin = localStorage.getItem('isAdmin') === 'true';

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch {
      user = null;
    }

    setIsAuthenticated(auth);
    setIsAdmin(admin);
    setCurrentUser(user);
  }, []);

  const login = async (email, password) => {
    const adminEmail = 'mirajpatel@gmail.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      localStorage.removeItem('currentUser');
      setIsAuthenticated(true);
      setIsAdmin(true);
      setCurrentUser(null);
      return { ok: true, role: 'admin' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuthenticated(true);
      setIsAdmin(false);
      setCurrentUser(user);
      return { ok: true, role: 'user' };
    }

    return { ok: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  const updateCurrentUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const value = useMemo(() => ({
    isAuthenticated,
    isAdmin,
    currentUser,
    login,
    logout,
    updateCurrentUser,
  }), [isAuthenticated, isAdmin, currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}