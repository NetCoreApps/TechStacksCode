import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Layers, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import useAppStore from '../stores/useAppStore';
import { queryLatestPosts } from '../services/api';

export default function HomePage() {
  const { overview, allOrganizations } = useAppStore();
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const posts = await queryLatestPosts(null, null, 0, 10);
        setLatestPosts(posts || []);
      } catch (error) {
        console.error('Failed to load latest posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const topTechnologies = overview.topTechnologies || [];
  const topUsers = overview.topUsers || [];

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Discover Technology Stacks</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Find the Perfect
            <span className="text-primary-600"> Tech Stack</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore and share technology stacks used by leading developers and organizations worldwide
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link
              to="/tech"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>Browse Technologies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/stacks"
              className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            >
              View Stacks
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Cpu className="w-8 h-8" />}
              title="Technologies"
              value={overview.topTechnologies?.length || 0}
              link="/tech"
            />
            <StatCard
              icon={<Layers className="w-8 h-8" />}
              title="Tech Stacks"
              value={overview.allTechStacks?.length || 0}
              link="/stacks"
            />
            <StatCard
              icon={<Users className="w-8 h-8" />}
              title="Communities"
              value={allOrganizations.length}
              link="/organizations"
            />
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Active Users"
              value={topUsers.length}
              link="/top"
            />
          </div>
        </div>
      </section>

      {/* Top Technologies */}
      {topTechnologies.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Top Technologies</h2>
            <Link
              to="/tech"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {topTechnologies.slice(0, 10).map((tech) => (
              <TechnologyCard key={tech.id} technology={tech} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {!loading && latestPosts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            <Link
              to="/news"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Communities Section */}
      {allOrganizations.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Popular Communities</h2>
            <Link
              to="/organizations"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOrganizations.slice(0, 6).map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, link }) {
  return (
    <Link
      to={link}
      className="card hover:shadow-md transition-shadow cursor-pointer text-center"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="p-3 bg-primary-100 text-primary-600 rounded-full">
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{value}+</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
    </Link>
  );
}

function TechnologyCard({ technology }) {
  return (
    <Link
      to={`/tech/${technology.slug}`}
      className="card hover:shadow-md transition-all hover:scale-105 cursor-pointer"
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        {technology.logoUrl && (
          <img
            src={technology.logoUrl}
            alt={technology.name}
            className="w-16 h-16 object-contain"
          />
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{technology.name}</h3>
          {technology.tier && (
            <p className="text-xs text-gray-500 mt-1">{technology.tier}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  const formattedDate = new Date(post.created).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      to={`/posts/${post.id}/${post.slug || ''}`}
      className="card hover:shadow-md transition-shadow"
    >
      <div className="space-y-3">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
              {post.type}
            </span>
            <span>{formattedDate}</span>
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <span>👍 {post.upVotes || 0}</span>
            <span>💬 {post.commentsCount || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function OrganizationCard({ organization }) {
  return (
    <Link
      to={`/organizations/${organization.slug}`}
      className="card hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        {organization.logoUrl && (
          <img
            src={organization.logoUrl}
            alt={organization.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{organization.name}</h3>
          {organization.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {organization.description}
            </p>
          )}
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>👥 {organization.membersCount || 0} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
