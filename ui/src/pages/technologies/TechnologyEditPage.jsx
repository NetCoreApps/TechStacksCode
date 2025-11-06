import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTechnology, updateTechnology } from '../../services/api';

export default function TechnologyEditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTechnology = async () => {
      try {
        const tech = await getTechnology(slug);
        setTechnology(tech);
      } catch (error) {
        console.error('Failed to load technology:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTechnology();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement full form handling
    console.log('Edit technology:', technology);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Edit Technology</h1>
        <div className="card">
          <p className="text-gray-600">Full edit form will be implemented here. Technology: {technology?.name}</p>
        </div>
      </div>
    </div>
  );
}
