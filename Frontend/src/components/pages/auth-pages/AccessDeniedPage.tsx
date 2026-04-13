import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function AccessDeniedPage() {
  const { currentUser, userProfile, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      navigate('/login', { replace: true });
      return;
    }
    if (userProfile?.status === 'approved') {
      navigate('/dashboard', { replace: true });
      return;
    }
    if (userProfile?.status === 'pending') {
      navigate('/approval-pending', { replace: true });
    }
  }, [currentUser, userProfile, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-rose-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-6">
            Your account access has been restricted by the administrator.
          </p>

          {/* Email display */}
          {currentUser?.email && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Account Email</p>
              <p className="text-gray-900 font-medium">{currentUser.email}</p>
            </div>
          )}

          {/* Info box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-red-900 mb-2">Why am I seeing this?</h3>
            <p className="text-red-800 text-sm mb-4">
              Your account has been rejected or suspended. This could be due to:
            </p>
            <ul className="space-y-2 text-red-800 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Violation of terms of service</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Incomplete or invalid registration information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Administrative decision</span>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 text-sm">
              If you believe this is a mistake, please contact our support team at{' '}
              <a href="mailto:support@truqual.com" className="underline font-medium">
                support@truqual.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
