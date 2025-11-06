import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Plus, Filter } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import { queryTechnology } from '../../services/api';

export default function TechnologiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allTiers, getters } = useAppStore();
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState(searchParams.get('tier') || '');

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const query = {};
        if (searchTerm) query.nameContains = searchTerm;
        if (selectedTier) query.tier = selectedTier;

        const result = await queryTechnology(query);
        setTechnologies(result.results || []);
      } catch (error) {
        console.error('Failed to load technologies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTechnologies();
  }, [searchTerm, selectedTier]);

  // Update URL when tier changes
  useEffect(() => {
    if (selectedTier) {
      setSearchParams({ tier: selectedTier });
    } else {
      setSearchParams({});
    }
  }, [selectedTier, setSearchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Technologies</h1>
            <p className="text-lg text-gray-600 mt-2">
              Discover and explore thousands of technologies
            </p>
          </div>
          {getters.isAuthenticated() && (
            <Link
              to="/tech/new"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Technology</span>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Tiers</option>
                {allTiers.map((tier) => (
                  <option key={tier.name || tier} value={tier.name || tier}>
                    {tier.name || tier}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Technologies Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : technologies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {technologies.map((tech) => (
              <Link
                key={tech.id}
                to={`/tech/${tech.slug}`}
                className="card hover:shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-3 text-center">
                  {tech.logoUrl && (
                    <img
                      src={tech.logoUrl}
                      alt={tech.name}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                    {tech.tier && (
                      <p className="text-xs text-gray-500 mt-1">{tech.tier}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No technologies found</p>
          </div>
        )}
      </div>
    </div>
  );
}
