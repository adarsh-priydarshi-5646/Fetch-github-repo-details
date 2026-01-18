import {
  GitPullRequest,
  Users,
  BarChart3,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Code,
  MoonStar,
  Sun,
} from "lucide-react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

interface LandingProps {
  onGetStarted: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Landing({ onGetStarted, darkMode, setDarkMode }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo size="md" />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonStar className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-6">
              Analyze GitHub Repositories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover active contributors, track pull requests, and analyze code changes across any GitHub repository in seconds.
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Contributor Insights
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See all contributors and their activity levels
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Code Statistics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track lines added, deleted, and commits per contributor
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GitPullRequest className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                PR Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyze pull requests, merges, and contribution patterns
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get results instantly with optimized API calls
              </p>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-100 dark:border-gray-700 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              How to Use
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Enter Repository
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Paste any GitHub repository URL or use the format{" "}
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    owner/repo
                  </code>
                </p>
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Select Time Period
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from 2 weeks, 1 month, 3 months, 6 months, or all time to filter results
                </p>
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  View Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See contributor stats, code changes, and pull request details instantly
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Key Features
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                    <Code className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Code Statistics
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    View lines of code added and deleted by each contributor
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-600 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Contributor Profiles
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Click on any contributor to see their detailed statistics
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-600 text-white">
                    <GitPullRequest className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    PR Tracking
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    See all pull requests with merge status and contributor info
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Maintainer Detection
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Automatically identifies repository maintainers and admins
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-red-600 text-white">
                    <MoonStar className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Comfortable viewing in any lighting condition
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    API Token Support
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Add your GitHub token for 5,000 requests/hour limit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mb-20">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">
              💡 Pro Tips
            </h3>
            <ul className="space-y-3 text-blue-800 dark:text-blue-200">
              <li className="flex gap-3">
                <span className="font-bold">•</span>
                <span>
                  <strong>Add a GitHub Token:</strong> Click "Add API Token" to increase your rate limit from 60 to 5,000 requests/hour
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">•</span>
                <span>
                  <strong>Click Contributors:</strong> Click on any contributor card to see their detailed statistics across all repositories
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">•</span>
                <span>
                  <strong>Expand PRs:</strong> Click the "Recent Pull Requests" section to see all PRs with merge status
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">•</span>
                <span>
                  <strong>Time Filtering:</strong> Use different time periods to see contribution trends over time
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Analyze?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Start exploring GitHub repositories and discover contributor insights
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Star className="w-5 h-5" />
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
