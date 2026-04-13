import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function ApprovalPendingPage() {
  const { currentUser, userProfile, loading, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      refreshProfile();
    }
  }, [currentUser, refreshProfile]);

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
    if (userProfile?.status === 'rejected') {
      navigate('/access-denied', { replace: true });
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Account Pending Approval
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-6">
            Thank you for registering! Your account is currently under review by our administrators.
          </p>

          {/* Email display */}
          {currentUser?.email && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Registered Email</p>
              <p className="text-gray-900 font-medium">{currentUser.email}</p>
            </div>
          )}

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Our team will review your account within 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll receive an email notification once your account is approved</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>After approval, you'll have full access to the dashboard</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
















