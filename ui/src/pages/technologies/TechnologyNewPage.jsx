import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TechnologyNewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form handling
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Add New Technology</h1>
        <div className="card">
          <p className="text-gray-600">Full form will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}
