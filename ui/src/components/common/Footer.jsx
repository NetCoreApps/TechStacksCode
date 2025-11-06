import { Link } from 'react-router-dom';
import { Github, Twitter, Layers } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">TechStacks</span>
            </div>
            <p className="text-sm text-gray-600">
              Discover and share technology stacks used by leading developers and organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tech" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Technologies
                </Link>
              </li>
              <li>
                <Link to="/stacks" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Tech Stacks
                </Link>
              </li>
              <li>
                <Link to="/organizations" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-primary-600 transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/top" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Top Technologies
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-primary-600 transition-colors">
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} TechStacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
