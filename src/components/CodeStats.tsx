import React from "react";
import { GitPullRequest, Plus, Minus, BarChart3 } from "lucide-react";

interface ContributorStats {
  username: string;
  additions: number;
  deletions: number;
  commits: number;
  avatarUrl: string;
}

interface CodeStatsProps {
  stats: ContributorStats[];
  repoName: string;
  repoUrl: string;
  totalAdditions: number;
  totalDeletions: number;
}

export default function CodeStats({
  stats,
  repoName,
  repoUrl,
  totalAdditions,
  totalDeletions,
}: CodeStatsProps) {
  const sortedStats = [...stats].sort(
    (a, b) => b.additions + b.deletions - (a.additions + a.deletions)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Code Statistics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Additions
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              +{totalAdditions.toLocaleString()}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-2">
              <Minus className="w-4 h-4 text-red-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total Deletions
              </span>
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              -{totalDeletions.toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Repository
              </span>
            </div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 truncate">
              {repoName}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Contributor
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Commits
              </th>
              <th className="text-right py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                Additions
              </th>
              <th className="text-right py-3 px-4 font-semibold text-red-600 dark:text-red-400">
                Deletions
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Total Changes
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((contributor) => (
              <tr
                key={contributor.username}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {contributor.username}
                    </span>
                  </div>
                </td>
                <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                  {contributor.commits}
                </td>
                <td className="text-right py-3 px-4 text-green-600 dark:text-green-400 font-medium">
                  +{contributor.additions.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 text-red-600 dark:text-red-400 font-medium">
                  -{contributor.deletions.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {(
                    contributor.additions + contributor.deletions
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Repository:</strong>{" "}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {repoUrl}
          </a>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <strong>Total Contributors:</strong> {stats.length}
        </p>
      </div>
    </div>
  );
}
