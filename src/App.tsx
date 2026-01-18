import React, { useState, useEffect } from "react";
import {
  Github,
  GitPullRequest,
  GitPullRequestClosed,
  GitMerge,
  Loader2,
  Users,
  MoonStar,
  Sun,
  RefreshCw,
  ArrowRight,
  Search,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Shield,
  Star,
  KeyRound,
  AlertCircle,
  X,
  Check,
  Plus,
  Minus,
  User,
  Code2,
  TrendingUp,
  GitBranch,
  Eye,
  Heart,
} from "lucide-react";
import {
  fetchRepoStats,
  fetchUserStats,
  registerLoadingHandler,
  fetchCodeStats,
} from "./utils/github";
import type { RepoStats, UserStats, TimeFilter } from "./types";
import { UserStatsModal } from "./components/UserStatsModal";
import { ProfileDisplay } from "./components/ProfileDisplay";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import PullRequestList from "./components/PullRequestList";
import { TokenSettings } from "./components/TokenSettings";
import { hasGitHubToken } from "./utils/env";
import Landing from "./pages/Landing";

type InputMode = "repository" | "profile";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [inputMode, setInputMode] = useState<InputMode>("repository");
  const [repoUrl, setRepoUrl] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [profileStats, setProfileStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1m");
  const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [showPRs, setShowPRs] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference first
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // Otherwise default to true (dark mode)
    return true;
  });
  const [loadingProgress, setLoadingProgress] = useState("");
  const [showTokenSettings, setShowTokenSettings] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showTokenNotification, setShowTokenNotification] = useState(false);
  const [codeStats, setCodeStats] = useState<{ [key: string]: { additions: number; deletions: number; commits: number } }>({});

  useEffect(() => {
    // Register loading progress handler
    registerLoadingHandler(setLoadingProgress);

    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Check for GitHub token
    const hasExistingToken = hasGitHubToken();
    setHasToken(hasExistingToken);

    // Show notification for users without a token
    const hasSeenNotification = localStorage.getItem("token_notification_seen");
    if (!hasExistingToken && !hasSeenNotification) {
      setShowTokenNotification(true);
    }
  }, [darkMode]); // Note: this dependency is fine as registerLoadingHandler only needs to be called once

  // Add an effect to update the token status when window gets focus
  // This ensures the UI updates if the token is added in another tab
  useEffect(() => {
    const checkTokenOnFocus = () => {
      const tokenExists = hasGitHubToken();
      setHasToken(tokenExists);
    };

    window.addEventListener("focus", checkTokenOnFocus);
    return () => {
      window.removeEventListener("focus", checkTokenOnFocus);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStats(null);
    setProfileStats(null);
    setShowPRs(false);

    if (inputMode === "repository") {
      setLoadingProgress("Fetching repository data...");
      try {
        const data = await fetchRepoStats(repoUrl, timeFilter);
        
        if (!data || data.contributors.length === 0) {
          setError("No contributors or pull request data found for this repository. Try a different repository.");
          setLoading(false);
          setLoadingProgress("");
          return;
        }
        
        setStats(data);
        
        // Fetch code statistics
        try {
          const stats = await fetchCodeStats(repoUrl);
          const statsMap: { [key: string]: { additions: number; deletions: number; commits: number } } = {};
          stats.contributors.forEach((c: { username: string; additions: number; deletions: number; commits: number }) => {
            statsMap[c.username] = {
              additions: c.additions,
              deletions: c.deletions,
              commits: c.commits
            };
          });
          setCodeStats(statsMap);
        } catch (statsErr) {
          console.warn("Could not fetch code stats:", statsErr);
        }
        
        setLoadingProgress("");
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to fetch repository statistics";
        setError(errorMsg);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // Profile mode
      setLoadingProgress("Fetching profile data...");
      try {
        const userStats = await fetchUserStats(profileUsername, timeFilter);
        setProfileStats(userStats);
        setLoadingProgress("");
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to fetch profile statistics";
        setError(errorMsg);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUserClick = async (username: string) => {
    setLoadingUser(true);
    setLoadingProgress(`Loading details for ${username}...`);
    try {
      const userStats = await fetchUserStats(username, timeFilter);
      setSelectedUser(userStats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user statistics"
      );
    } finally {
      setLoadingUser(false);
      setLoadingProgress("");
    }
  };

  const togglePRs = () => {
    setShowPRs(!showPRs);
  };

  const dismissTokenNotification = () => {
    setShowTokenNotification(false);
    localStorage.setItem("token_notification_seen", "true");
  };

  const openTokenSettings = () => {
    setShowTokenSettings(true);
    setShowTokenNotification(false);
    localStorage.setItem("token_notification_seen", "true");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {showLanding ? (
        <Landing 
          onGetStarted={() => setShowLanding(false)} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : (
        <>
          {showTokenNotification && (
        <div className="fixed bottom-4 right-4 max-w-md z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                  Increase API Rate Limits
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add your GitHub Personal Access Token to raise the API limit
                  from 60 to 5,000 requests per hour.
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={openTokenSettings}
                    className="text-sm px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Add Token
                  </button>
                  <button
                    onClick={dismissTokenNotification}
                    className="text-sm px-3 py-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                onClick={dismissTokenNotification}
                className="flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLanding(true)}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo size="md" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTokenSettings(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors duration-300 ${
                hasToken
                  ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {hasToken ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium hidden xs:inline">
                    API Token Added
                  </span>
                  <span className="text-sm font-medium xs:hidden">Token</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span className="text-sm font-medium hidden xs:inline">
                    Add API Token
                  </span>
                  <span className="text-sm font-medium xs:hidden">Token</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/adarsh-priydarshi-5646/Fetch-github-repo-details"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-3 py-1.5 rounded-md transition-all duration-300 hover:shadow-md"
            >
              <Star className="w-4 h-4 fill-white" />
              <span className="text-sm font-medium hidden xs:inline">
                Star on GitHub
              </span>
              <span className="text-sm font-medium xs:hidden">Star</span>
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonStar className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex-grow">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm">
            <BarChart2 className="w-4 h-4" />
            <span>Repository Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 mb-4 leading-tight">
            Analyze GitHub Repos
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Discover active contributors, track pull requests, and analyze code changes with beautiful visualizations and detailed insights.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 mb-16 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 hover:shadow-3xl hover:border-blue-300 dark:hover:border-blue-700/50 group"
        >
          {/* Mode Toggle */}
          <div className="mb-8 flex gap-2 bg-gray-100 dark:bg-gray-700/50 p-1.5 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => {
                setInputMode("repository");
                setError(null);
                setStats(null);
                setProfileStats(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                inputMode === "repository"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Repository</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode("profile");
                setError(null);
                setStats(null);
                setProfileStats(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                inputMode === "profile"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label
                htmlFor={inputMode === "repository" ? "repoUrl" : "profileUsername"}
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 tracking-wide"
              >
                {inputMode === "repository" ? "Repository URL or Path" : "GitHub Username or Profile URL"}
              </label>
              <div className="relative rounded-xl shadow-md overflow-hidden group/input">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search
                    className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-500 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                {inputMode === "repository" ? (
                  <input
                    id="repoUrl"
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="github.com/owner/repo"
                    className="block w-full rounded-xl border-0 py-3.5 pl-12 pr-4 text-gray-900 dark:text-white dark:bg-gray-700/60 ring-1 ring-inset ring-gray-300 dark:ring-gray-600/50 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 text-ellipsis font-medium"
                    required
                  />
                ) : (
                  <input
                    id="profileUsername"
                    type="text"
                    value={profileUsername}
                    onChange={(e) => setProfileUsername(e.target.value)}
                    placeholder="username or github.com/username"
                    className="block w-full rounded-xl border-0 py-3.5 pl-12 pr-4 text-gray-900 dark:text-white dark:bg-gray-700/60 ring-1 ring-inset ring-gray-300 dark:ring-gray-600/50 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 text-ellipsis font-medium"
                    required
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-56">
              <label
                htmlFor="timeFilter"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 tracking-wide"
              >
                Time Period
              </label>
              <div className="relative rounded-xl shadow-md overflow-hidden group/select">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <BarChart2
                    className="h-5 w-5 text-gray-400 group-focus-within/select:text-blue-500 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <select
                  id="timeFilter"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                  className="block w-full rounded-xl border-0 py-3.5 pl-12 pr-10 text-gray-900 dark:text-white dark:bg-gray-700/60 ring-1 ring-inset ring-gray-300 dark:ring-gray-600/50 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 appearance-none font-medium"
                >
                  <option value="2w">2 Weeks</option>
                  <option value="1m">1 Month</option>
                  <option value="3m">3 Months</option>
                  <option value="6m">6 Months</option>
                  <option value="all">All Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown className="h-5 w-5 text-gray-400 group-focus-within/select:text-blue-500 transition-colors duration-300" />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <span>Get Statistics</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 rounded-md animate-fadeIn transition-colors duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-3 text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 animate-pulse border border-gray-100 dark:border-gray-700 transition-colors duration-300 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
              <p className="text-gray-700 dark:text-gray-300">
                {loadingProgress || "Loading..."}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This may take a moment for large repositories
              </p>
            </div>
          </div>
        )}

        {loadingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center gap-3 shadow-xl transition-colors duration-300">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-gray-700 dark:text-gray-200">
                Loading user statistics...
              </p>
            </div>
          </div>
        )}

        {selectedUser && (
          <UserStatsModal
            stats={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {stats && (
          <div className="space-y-12 animate-fadeIn">
            {/* Contributors Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700/50">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Contributors
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Active contributors in this repository
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-900/10 p-5 rounded-2xl border border-blue-200 dark:border-blue-800/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Total Contributors</p>
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">{stats.contributors.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-900/10 p-5 rounded-2xl border border-green-200 dark:border-green-800/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Lines Added</p>
                  <p className="text-3xl font-black text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    +{Object.values(codeStats).reduce((sum, s) => sum + s.additions, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-900/10 p-5 rounded-2xl border border-red-200 dark:border-red-800/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Lines Deleted</p>
                  <p className="text-3xl font-black text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                    -{Object.values(codeStats).reduce((sum, s) => sum + s.deletions, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-900/10 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Total Commits</p>
                  <p className="text-3xl font-black text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {Object.values(codeStats).reduce((sum, s) => sum + s.commits, 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {stats.contributors.map((contributor) => (
                  <button
                    key={contributor.username}
                    onClick={() => handleUserClick(contributor.username)}
                    className="flex flex-col items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/40 dark:to-gray-700/20 rounded-2xl hover:from-blue-50 hover:to-blue-100/50 dark:hover:from-blue-900/30 dark:hover:to-blue-900/20 transition-all duration-500 text-left border border-gray-200 dark:border-gray-700/50 group hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700/50 hover:-translate-y-1"
                  >
                    <div className="relative w-full">
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={contributor.avatarUrl}
                            alt={contributor.username}
                            className="w-16 h-16 rounded-2xl ring-3 ring-white dark:ring-gray-800 group-hover:ring-blue-400 transition-all duration-300 shadow-md group-hover:shadow-lg"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1.5 border-2 border-gray-200 dark:border-gray-700 shadow-md group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                            <Github className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                            {contributor.username}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap mt-2">
                            {contributor.isMaintainer ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 dark:from-purple-900/40 dark:to-purple-900/20 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-sm">
                                <Shield className="w-3.5 h-3.5" />
                                Maintainer
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 dark:from-blue-900/40 dark:to-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-sm">
                                <Users className="w-3.5 h-3.5" />
                                Contributor
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-200 dark:border-gray-700/50">
                      <div className="flex items-center gap-2 group/stat">
                        <GitPullRequest className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/stat:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PRs</p>
                          <p className="font-bold text-gray-900 dark:text-white">{contributor.totalPRs}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 group/stat">
                        <GitMerge className="w-4 h-4 text-green-600 dark:text-green-400 group-hover/stat:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Merged</p>
                          <p className="font-bold text-gray-900 dark:text-white">{contributor.mergedPRs}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 group/stat">
                        <GitPullRequest className="w-4 h-4 text-yellow-600 dark:text-yellow-400 group-hover/stat:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
                          <p className="font-bold text-gray-900 dark:text-white">{contributor.openPRs}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 group/stat">
                        <GitPullRequestClosed className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/stat:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Closed</p>
                          <p className="font-bold text-gray-900 dark:text-white">{contributor.closedPRs}</p>
                        </div>
                      </div>
                      {codeStats[contributor.username] ? (
                        <>
                          <div className="flex items-center gap-2 group/stat">
                            <Plus className="w-4 h-4 text-green-600 dark:text-green-400 group-hover/stat:scale-110 transition-transform duration-300" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Added</p>
                              <p className="font-bold text-gray-900 dark:text-white">+{codeStats[contributor.username].additions}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 group/stat">
                            <Minus className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/stat:scale-110 transition-transform duration-300" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Deleted</p>
                              <p className="font-bold text-gray-900 dark:text-white">-{codeStats[contributor.username].deletions}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 group/stat col-span-2">
                            <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/stat:scale-110 transition-transform duration-300" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Commits</p>
                              <p className="font-bold text-gray-900 dark:text-white">{codeStats[contributor.username].commits}</p>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pull Requests Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700/50">
              <button
                onClick={togglePRs}
                className="w-full p-7 bg-gradient-to-r from-blue-50 via-blue-50/50 to-cyan-50/30 dark:from-blue-900/20 dark:via-blue-900/10 dark:to-cyan-900/10 border-b dark:border-gray-700/50 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:from-blue-100 hover:to-cyan-100/50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/20 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/60 transition-colors duration-300">
                      <GitPullRequest className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        Recent Pull Requests
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                        Showing PRs from selected time period
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 px-4 py-2 rounded-full shadow-sm text-gray-700 dark:text-gray-300 font-bold border border-blue-200 dark:border-blue-800/50">
                      <span className="text-blue-600 dark:text-blue-400">{stats.totalPRs}</span>{" "}
                      <span>pull requests</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                      {showPRs ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {showPRs && (
                <PullRequestList
                  pullRequests={stats.recentPRs}
                  onUserClick={handleUserClick}
                  maintainers={
                    new Set(
                      stats.contributors
                        .filter((c) => c.isMaintainer)
                        .map((c) => c.username)
                    )
                  }
                />
              )}
            </div>
          </div>
        )}

        {profileStats && (
          <ProfileDisplay stats={profileStats} onUserClick={handleUserClick} />
        )}

        {!stats && !profileStats && !loading && !error && (
          <div className="mt-16 text-center py-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <RefreshCw className="w-10 h-10 text-blue-500 dark:text-blue-400 opacity-60" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No data to display
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed font-light">
              {inputMode === "repository"
                ? "Enter a GitHub repository URL and select a time period to analyze contributions and pull requests."
                : "Enter a GitHub username to view their profile, repositories, and contribution statistics."}
            </p>
          </div>
        )}
      </main>

      <TokenSettings
        isOpen={showTokenSettings}
        onClose={() => setShowTokenSettings(false)}
        onTokenSaved={() => {
          setHasToken(true);
          setShowTokenNotification(false);
        }}
      />

      <Footer />
        </>
      )}
    </div>
  );
}

export default App;
