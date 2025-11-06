import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import { queryTechStacks } from '../../services/api';

export default function TechStacksPage() {
  const { getters } = useAppStore();
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadStacks = async () => {
      try {
        const query = {};
        if (searchTerm) query.nameContains = searchTerm;
        const result = await queryTechStacks(query);
        setStacks(result.results || []);
      } catch (error) {
        console.error('Failed to load stacks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStacks();
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Tech Stacks</h1>
            <p className="text-lg text-gray-600 mt-2">Explore technology stacks from developers worldwide</p>
          </div>
          {getters.isAuthenticated() && (
            <Link to="/stacks/new" className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Stack</span>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tech stacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : stacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stacks.map((stack) => (
              <Link key={stack.id} to={`/stacks/${stack.slug}`} className="card hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  {stack.screenshotUrl && (
                    <img src={stack.screenshotUrl} alt={stack.name} className="w-full h-48 object-cover rounded-lg" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{stack.name}</h3>
                    {stack.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{stack.description}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12"><p className="text-gray-500">No tech stacks found</p></div>
        )}
      </div>
    </div>
  );
}
