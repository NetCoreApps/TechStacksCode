import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  Home,
  Cpu,
  Layers,
  Users,
  Newspaper,
  TrendingUp,
  Heart,
  LogIn,
  LogOut,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import { logout } from '../../services/api';

export default function Header() {
  const navigate = useNavigate();
  const { sessionInfo, setSessionInfo } = useAppStore();
  const isAuthenticated = sessionInfo != null;
  const userName = sessionInfo?.userName;

  const handleLogout = async () => {
    await logout();
    setSessionInfo(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            <Layers className="w-8 h-8" />
            <span>TechStacks</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home className="w-4 h-4" />}>
              Home
            </NavLink>
            <NavLink to="/tech" icon={<Cpu className="w-4 h-4" />}>
              Technologies
            </NavLink>
            <NavLink to="/stacks" icon={<Layers className="w-4 h-4" />}>
              Stacks
            </NavLink>
            <NavLink to="/organizations" icon={<Users className="w-4 h-4" />}>
              Communities
            </NavLink>
            <NavLink to="/news" icon={<Newspaper className="w-4 h-4" />}>
              News
            </NavLink>
            <NavLink to="/top" icon={<TrendingUp className="w-4 h-4" />}>
              Top
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/favorites" icon={<Heart className="w-4 h-4" />}>
                Favorites
              </NavLink>
            )}
          </nav>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/users/${sessionInfo.userAuthId}`}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <UserIcon className="w-4 h-4 mr-3" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/favorites"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <Heart className="w-4 h-4 mr-3" />
                            Favorites
                          </Link>
                        )}
                      </Menu.Item>
                      <hr className="my-1 border-gray-200" />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center w-full text-left px-4 py-2 text-sm text-red-600`}
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
