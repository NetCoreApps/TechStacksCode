import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ExternalLink, Heart, Edit, Trash2 } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import { getTechnology, addFavoriteTechnology, removeFavoriteTechnology, deleteTechnology } from '../../services/api';

export default function TechnologyDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getters, setTechnology, addFavoriteTechnology: addFavoriteStore, removeFavoriteTechnology: removeFavoriteStore } = useAppStore();
  const [technology, setTech] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = getters.isFavoriteTechnology(slug);
  const canEdit = technology && getters.isAuthenticated() && (!technology.isLocked || getters.userId() === technology.ownerId || getters.isAdmin());

  useEffect(() => {
    const loadTechnology = async () => {
      try {
        const tech = await getTechnology(slug);
        setTech(tech);
        setTechnology(tech);
      } catch (error) {
        console.error('Failed to load technology:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTechnology();
  }, [slug]);

  const handleToggleFavorite = async () => {
    if (!getters.isAuthenticated()) {
      navigate('/auth/login');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoriteTechnology(technology.id);
        removeFavoriteStore(technology.id);
      } else {
        await addFavoriteTechnology(technology.id);
        addFavoriteStore(technology);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this technology?')) return;

    try {
      await deleteTechnology(technology.id);
      navigate('/tech');
    } catch (error) {
      console.error('Failed to delete technology:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Technology not found</h2>
          <Link to="/tech" className="text-primary-600 hover:text-primary-700">
            Browse all technologies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="card">
          <div className="flex items-start space-x-6">
            {technology.logoUrl && (
              <img
                src={technology.logoUrl}
                alt={technology.name}
                className="w-24 h-24 object-contain"
              />
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{technology.name}</h1>
                  <p className="text-gray-600 mt-2">{technology.tier}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`btn-outline flex items-center space-x-2 ${
                      isFavorite ? 'bg-red-50 border-red-300 text-red-600' : ''
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    <span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span>
                  </button>
                  {canEdit && (
                    <>
                      <Link to={`/tech/${slug}/edit`} className="btn-outline flex items-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>
                      {getters.isAdmin() && (
                        <button onClick={handleDelete} className="btn-outline text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {technology.vendorName && (
                <p className="text-gray-600 mt-4">
                  <strong>Vendor:</strong> {technology.vendorName}
                </p>
              )}

              {technology.description && (
                <p className="text-gray-700 mt-4">{technology.description}</p>
              )}

              {technology.vendorUrl && (
                <a
                  href={technology.vendorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mt-4"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stacks using this technology */}
        {technology.technologyStacks && technology.technologyStacks.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Used in {technology.technologyStacks.length} Tech Stack{technology.technologyStacks.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technology.technologyStacks.slice(0, 10).map((stack) => (
                <Link
                  key={stack.id}
                  to={`/stacks/${stack.slug}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">{stack.name}</h3>
                  {stack.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{stack.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
