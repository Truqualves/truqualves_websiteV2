import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      navigate('/approval-pending');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white text-gray-500 max-w-96 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <div className="flex justify-center mb-4">
          <img className="h-20" src="/logo.png" alt="Truqualves logo" />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            id="name"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            id="confirmPassword"
            className="w-full bg-transparent border mt-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mb-3 mt-4 bg-indigo-500 py-2.5 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <button
          type="button"
          onClick={async () => {
            try {
              setError('');
              setLoading(true);
              await loginWithGoogle();
              navigate('/dashboard');
            } catch (err: unknown) {
              const errorMessage = err instanceof Error ? err.message : 'Google sign-up failed';
              setError(errorMessage);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Sign up with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
