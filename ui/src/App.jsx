import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import useAppStore from './stores/useAppStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CallbackPage from './pages/auth/CallbackPage';

// Technology Pages
import TechnologiesPage from './pages/technologies/TechnologiesPage';
import TechnologyDetailPage from './pages/technologies/TechnologyDetailPage';
import TechnologyEditPage from './pages/technologies/TechnologyEditPage';
import TechnologyNewPage from './pages/technologies/TechnologyNewPage';

// Tech Stacks Pages
import TechStacksPage from './pages/stacks/TechStacksPage';
import TechStackDetailPage from './pages/stacks/TechStackDetailPage';
import TechStackEditPage from './pages/stacks/TechStackEditPage';
import TechStackNewPage from './pages/stacks/TechStackNewPage';

// Organization Pages
import OrganizationsPage from './pages/organizations/OrganizationsPage';
import OrganizationDetailPage from './pages/organizations/OrganizationDetailPage';
import OrganizationPostsPage from './pages/organizations/OrganizationPostsPage';
import OrganizationCategoryPage from './pages/organizations/OrganizationCategoryPage';

// Post Pages
import NewsPage from './pages/posts/NewsPage';
import PostDetailPage from './pages/posts/PostDetailPage';
import TopPage from './pages/posts/TopPage';

// User Pages
import UserProfilePage from './pages/users/UserProfilePage';
import FavoritesPage from './pages/users/FavoritesPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const { loadConfig, loadOverview, loadSessionInfo, loadTechnologyTiers, setHasData } = useAppStore();

  useEffect(() => {
    // Load initial data
    const initializeApp = async () => {
      try {
        await Promise.all([
          loadConfig(),
          loadOverview(),
          loadSessionInfo(),
          loadTechnologyTiers(),
        ]);
        setHasData(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<CallbackPage />} />
            <Route path="/signin-github" element={<CallbackPage />} />
            <Route path="/signin-oidc-github" element={<CallbackPage />} />
          </Route>

          {/* Main Routes with Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            {/* Technology Routes */}
            <Route path="/tech" element={<TechnologiesPage />} />
            <Route path="/tech/new" element={<TechnologyNewPage />} />
            <Route path="/tech/:slug" element={<TechnologyDetailPage />} />
            <Route path="/tech/:slug/edit" element={<TechnologyEditPage />} />

            {/* Tech Stack Routes */}
            <Route path="/stacks" element={<TechStacksPage />} />
            <Route path="/stacks/new" element={<TechStackNewPage />} />
            <Route path="/stacks/:slug" element={<TechStackDetailPage />} />
            <Route path="/stacks/:slug/edit" element={<TechStackEditPage />} />

            {/* Organization Routes */}
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="/organizations/:slug" element={<OrganizationDetailPage />} />
            <Route path="/:slug" element={<OrganizationPostsPage />} />
            <Route path="/:slug/:category" element={<OrganizationCategoryPage />} />

            {/* Post Routes */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/posts/:id/:postslug?" element={<PostDetailPage />} />
            <Route path="/top" element={<TopPage />} />

            {/* User Routes */}
            <Route path="/users/:id" element={<UserProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Legacy redirects */}
            <Route path="/login/:provider?" element={<Navigate to="/auth/login" replace />} />
          </Route>

          {/* 404 - Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
