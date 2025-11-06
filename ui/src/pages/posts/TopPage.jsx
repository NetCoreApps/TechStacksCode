import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';

export default function TopPage() {
  const { overview, allTiers } = useAppStore();

  const topTechnologies = overview.topTechnologies || [];
  const topTechnologiesByTier = overview.topTechnologiesByTier || {};
  const topUsers = overview.topUsers || [];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Top Technologies</span>
              </div>

              <h1 className="text-5xl font-bold">
                Discover Popular Technologies
              </h1>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <p className="text-lg text-white/90">
                  Discover what technologies were used to create popular Websites and Apps, for example here's what{' '}
                  <Link to="/stacks/techstacks" className="text-white font-semibold hover:underline">
                    TechStacks was created
                  </Link>{' '}
                  with.
                </p>
                <p className="text-white/80">
                  Missing your favorite Tech or TechStack? Sign-in to add it now and customize this page to see who else uses your favorite technology.
                </p>
              </div>

              {/* Mobile Apps Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <a
                  href="https://github.com/ServiceStackApps/TechStacksApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold">Swift iOS App</span>
                  </div>
                </a>
                <a
                  href="https://github.com/ServiceStackApps/TechStacksAndroidApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold">Java Android App</span>
                  </div>
                </a>
                <a
                  href="https://github.com/ServiceStackApps/TechStacksKotlinApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold">Kotlin Android App</span>
                  </div>
                </a>
                <a
                  href="https://github.com/ServiceStackApps/HelloMobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-sm font-semibold">C# Xamarin App</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side - Top Technologies by Tier (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allTiers.map((tier) => {
                const tierName = tier.name || tier;
                const tierTitle = tier.title || tierName;
                const tierTechnologies = topTechnologiesByTier[tierName] || [];

                return (
                  <div key={tierName} className="space-y-3">
                    <Link
                      to={`/tech?tier=${tierName}`}
                      className="block"
                    >
                      <div className="bg-primary-600 text-white px-4 py-3 rounded-t-lg hover:bg-primary-700 transition-colors">
                        <h2 className="text-lg font-semibold">{tierTitle}</h2>
                      </div>
                    </Link>

                    <div className="card rounded-t-none space-y-3">
                      {tierTechnologies.length > 0 ? (
                        <>
                          {tierTechnologies.slice(0, 5).map((tech) => (
                            <Link
                              key={tech.slug}
                              to={`/tech/${tech.slug}`}
                              className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                            >
                              <div className="text-2xl font-bold text-gray-400 min-w-[50px] text-center group-hover:text-primary-600 transition-colors">
                                ({tech.stacksCount || 0})
                              </div>
                              <div className="flex-1">
                                {tech.logoUrl ? (
                                  <img
                                    src={tech.logoUrl}
                                    alt={tech.name}
                                    className="h-11 object-contain"
                                  />
                                ) : (
                                  <span className="font-semibold text-gray-900">{tech.name}</span>
                                )}
                              </div>
                            </Link>
                          ))}

                          <div className="pt-3 border-t border-gray-200">
                            <Link
                              to={`/tech?tier=${tierName}`}
                              className="flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium py-2 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <span>View all</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No technologies in this tier</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Browse by Technology (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              <Link to="/tech">
                <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg hover:bg-gray-900 transition-colors">
                  <h2 className="text-lg font-semibold">Browse by Technology</h2>
                </div>
              </Link>

              <div className="card rounded-t-none space-y-2">
                {topTechnologies.length > 0 ? (
                  topTechnologies.slice(0, 20).map((tech) => (
                    <Link
                      key={tech.slug}
                      to={`/tech/${tech.slug}`}
                      className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-400 group-hover:text-primary-600 transition-colors">
                          ({tech.stacksCount || 0})
                        </span>
                        <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No technologies found</p>
                )}
              </div>

              {topTechnologies.length > 20 && (
                <Link
                  to="/tech"
                  className="block text-center py-3 text-primary-600 hover:text-primary-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                >
                  View all technologies
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
