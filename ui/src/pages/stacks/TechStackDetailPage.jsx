import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TechStackDetailPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">TechStackDetailPage</h1>
        <div className="card">
          <p className="text-gray-600">This page is under development.</p>
        </div>
      </div>
    </div>
  );
}
