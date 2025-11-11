import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const demoAccount = {
    email: "miraj@example.com",
    password: "miraj123"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const result = await login(email, password);

    if (result.ok) {
      setLoading(false);
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
      return;
    }

    setErrorMessage(result.error || 'Login failed');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b0b0d] to-[#111827] p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-28 -left-24 w-80 h-80 bg-fuchsia-500/25 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-400/20 blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-400/20 blur-3xl rounded-full"></div>
      </div>

      {/* Login Form */}
      <form
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-amber-500/20 transition-all w-full max-w-md p-6 sm:p-8 rounded-2xl space-y-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold text-center text-yellow-400">Sign In</h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 text-gray-300 hover:text-yellow-300 transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white-900 font-semibold rounded-xl  transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-yellow-400 hover:underline">
            create New Account
          </Link>
        </p>
      </form>

      {/* Quick Access Box: below form on small/medium screens, top-right on large screens */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg text-gray-200 p-4 rounded-2xl max-w-xs mt-4 sm:mt-6 md:mt-8 lg:absolute lg:top-10 lg:right-10 lg:mt-0">
        <h3 className="text-yellow-400 text-lg font-semibold mb-2">Quick Access</h3>
        <p className="mb-2">Use the following credentials:</p>
        <div className="mb-4">
          <p className="font-semibold">Admin Account:</p>
          <p>Email: <span className="text-yellow-300">mirajpatel@gmail.com</span></p>
          <p>Password: <span className="text-yellow-300">admin123</span></p>
          <p className="text-sm text-gray-400 mt-1">Admin can edit or delete user accounts.</p>
        </div>
        <div>
          <p className="font-semibold">Demo Account:</p>
          <p>Email: <span className="text-yellow-300">{demoAccount.email}</span></p>
          <p>Password: <span className="text-yellow-300">{demoAccount.password}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
