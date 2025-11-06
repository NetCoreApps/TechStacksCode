import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Layers } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionInfo } = useAppStore();
  const isAuthenticated = sessionInfo != null;

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleGitHubLogin = () => {
    // Redirect to the backend GitHub OAuth endpoint
    window.location.href = '/auth/github';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-primary-100 rounded-full">
            <Layers className="w-10 h-10 text-primary-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to TechStacks</h1>
        <p className="text-gray-600">Sign in to continue to your account</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
        >
          <Github className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Secure authentication via GitHub OAuth
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleGitHubLogin}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign up with GitHub
          </button>
        </p>
      </div>
    </div>
  );
}
