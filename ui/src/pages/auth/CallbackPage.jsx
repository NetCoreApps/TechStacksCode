import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';

export default function CallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loadSessionInfo } = useAppStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait a bit for the cookie to be set
        await new Promise(resolve => setTimeout(resolve, 500));

        // Reload session info
        await loadSessionInfo();

        // Get the redirect URL from query params or default to home
        const params = new URLSearchParams(location.search);
        const redirectUrl = params.get('redirect') || '/';

        navigate(redirectUrl, { replace: true });
      } catch (error) {
        console.error('Authentication callback error:', error);
        navigate('/auth/login', { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate, loadSessionInfo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto" />
        <h2 className="text-xl font-semibold text-gray-900">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we authenticate you</p>
      </div>
    </div>
  );
}
