import React from "react";
import {
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  Users,
  TrendingUp,
  Shield,
  Code2,
} from "lucide-react";
import type { UserStats } from "../types";

interface ProfileDisplayProps {
  stats: UserStats;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  stats,
}) => {
  const topRepos = Object.entries(stats.repositories)
    .sort(([, a], [, b]) => b.totalPRs - a.totalPRs)
    .slice(0, 6);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-3xl hover:border-blue-300 dark:hover:border-blue-700/50">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={stats.avatarUrl}
              alt={stats.username}
              className="w-32 h-32 rounded-3xl ring-4 ring-blue-500 dark:ring-blue-400 shadow-xl"
            />
            {stats.isMaintainer && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg ring-4 ring-white dark:ring-gray-800">
                <Shield className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                {stats.username}
              </h1>
              {stats.isMaintainer && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 dark:from-purple-900/40 dark:to-purple-900/20 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-md">
                  <Shield className="w-4 h-4" />
                  Maintainer
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              GitHub Developer
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Total PRs
                </p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {stats.totalStats.totalPRs}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Merged
                </p>
                <p className="text-2xl font-black text-green-600 dark:text-green-400">
                  {stats.totalStats.mergedPRs}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-900/10 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800/50 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Open
                </p>
                <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400">
                  {stats.totalStats.openPRs}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800/50 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Closed
                </p>
                <p className="text-2xl font-black text-red-600 dark:text-red-400">
                  {stats.totalStats.closedPRs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Repositories */}
      {topRepos.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Top Repositories
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Repositories with most contributions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRepos.map(([repoName, repoStats]) => (
              <div
                key={repoName}
                className="flex flex-col gap-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/40 dark:to-gray-700/20 rounded-2xl hover:from-blue-50 hover:to-blue-100/50 dark:hover:from-blue-900/30 dark:hover:to-blue-900/20 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 group hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700/50 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                      {repoName}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center gap-2 group/stat">
                    <GitPullRequest className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/stat:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {repoStats.totalPRs}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group/stat">
                    <GitMerge className="w-4 h-4 text-green-600 dark:text-green-400 group-hover/stat:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Merged
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {repoStats.mergedPRs}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group/stat">
                    <GitPullRequest className="w-4 h-4 text-yellow-600 dark:text-yellow-400 group-hover/stat:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Open
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {repoStats.openPRs}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group/stat">
                    <GitPullRequestClosed className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/stat:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Closed
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {repoStats.closedPRs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Repositories */}
      {Object.keys(stats.repositories).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Repositories
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Complete list of repositories with contributions
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Repository
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Total
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Merged
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Open
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Closed
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.repositories)
                  .sort(([, a], [, b]) => b.totalPRs - a.totalPRs)
                  .map(([repoName, repoStats]) => (
                    <tr
                      key={repoName}
                      className="border-b border-gray-100 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-300"
                    >
                      <td className="py-4 px-4">
                        <a
                          href={`https://github.com/${repoName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
                        >
                          <Code2 className="w-4 h-4" />
                          {repoName}
                        </a>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold">
                          {repoStats.totalPRs}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-bold">
                          {repoStats.mergedPRs}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-bold">
                          {repoStats.openPRs}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                          {repoStats.closedPRs}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
