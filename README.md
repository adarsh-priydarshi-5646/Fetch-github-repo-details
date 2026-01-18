# Fetch GitHub Repo Details 🚀

## Overview
Fetch GitHub Repo Details is a modern, professional web application designed to analyze GitHub repositories and developer profiles. It helps you discover active contributors, track pull requests, analyze code changes, and explore developer profiles across any GitHub repository. Perfect for mentors, organization administrators, and anyone interested in understanding contribution patterns in open-source projects.

## ✨ Key Features

### 🔀 Dual Input Modes

#### Repository Mode
- Analyze any GitHub repository to fetch and analyze pull requests
- Filter contributions by time periods: **2 weeks, 1 month, 3 months, 6 months, or all time**
- Handles pagination for repositories with many PRs (up to **500 PRs across 5 pages**)
- View all contributors with detailed statistics
- Identify project maintainers vs regular contributors

#### Profile Mode
- Search for any GitHub user by username or profile URL
- View comprehensive user profile with avatar and stats
- See all repositories with contributions
- Display top repositories by contribution count
- View total contribution statistics across all repositories
- Identify if user is a maintainer in any repository

### 👥 Contributor Insights
- Identify and distinguish between **project maintainers** and **regular contributors**
- View detailed statistics for each contributor:
  - Total number of PRs
  - Number of merged PRs
  - Number of open PRs
  - Number of closed PRs
  - Lines of code added/deleted
  - Total commits
- Sort contributors based on **activity level**
- Click on any contributor to view their detailed profile

### 📊 Code Statistics
- Track **lines of code added** by each contributor
- Track **lines of code deleted** by each contributor
- View **total commits** per contributor
- Aggregate statistics across all contributors
- Visual representation of code changes

### 🔗 Pull Request Tracking
- View **detailed list of recent PRs** in a repository
- See **PR status** (open, merged, closed)
- Filter PRs by selected **time periods**
- Access **direct links** to PRs on GitHub
- Identify PR authors and their contribution status

### 👤 User Statistics
- Click on any contributor to see **detailed contribution stats**
- View repository-specific **contribution metrics** for each user
- See all **recent PRs created by a specific user**
- Analyze the **distribution of PRs across different repositories**
- View maintainer status across repositories

### 🔐 API Token Management
- Option to add a **GitHub Personal Access Token** to increase API rate limits (**from 60 to 5,000 requests/hour**)
- Tokens are **stored locally** for security (never sent to any server)
- **Notification system** for users without tokens
- Easy token management interface

### ⚡ Performance Optimizations
- **In-memory caching system** to reduce redundant API calls
- **Maintainer status caching** (1-hour TTL)
- **General data caching** (5-minute TTL)
- **Deduplication** of in-flight requests
- **Request limiting** to prevent excessive API usage
- Optimized pagination for large datasets

### 🎨 Professional UI/UX
- **Modern, clean design** with professional color scheme
- **Dark/light mode toggle** with persistent user preference
- **Responsive design** that works across all screen sizes
- **Smooth animations and transitions**
- **Subtle gradients and shadows** for depth
- **Professional typography and hierarchy**
- **Loading indicators** with progress messages
- **Clear error messages** with helpful guidance
- **Collapsible sections** for better organization
- **All emojis replaced with lucide-react icons** for consistency

### 🎯 Visual Enhancements
- **Gradient backgrounds** for modern aesthetic
- **Card-based layouts** with hover effects
- **Color-coded statistics** (blue for PRs, green for merged, yellow for open, red for closed)
- **Icon-based visual indicators** throughout the interface
- **Professional badge system** for maintainer/contributor status
- **Smooth transitions** between states
- **Accessible color contrasts** for readability

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **API Integration**: Octokit (GitHub API)
- **Icons**: lucide-react (professional icon library)
- **Utilities**: date-fns (for date manipulation and filtering)
- **Build Tool**: Vite
- **Performance Enhancements**:
  - Custom caching layer for efficiency
  - Persistent storage for user preferences and tokens
  - Component-based architecture with clean separation of concerns

## Getting Started

### Prerequisites
- Node.js (>=16.x recommended)
- GitHub Personal Access Token (optional but recommended for higher API limits)

### Installation
```bash
# Clone the repository
git clone https://github.com/adarsh-priydarshi-5646/Fetch-github-repo-details.git
cd Fetch-github-repo-details

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Running in Production
To build and run the app in production mode:
```bash
npm run build
npm run preview
```

## Usage Guide

### Repository Mode
1. Click the **"Repository"** tab in the input form
2. Enter a GitHub repository URL or use format: `owner/repo`
3. Select a time period to filter contributions
4. Click **"Get Statistics"** to analyze the repository
5. View all contributors, their stats, and recent pull requests
6. Click on any contributor card to see their detailed profile

### Profile Mode
1. Click the **"Profile"** tab in the input form
2. Enter a GitHub username or profile URL
3. Select a time period to filter contributions
4. Click **"Get Statistics"** to view the profile
5. See user profile card with avatar and total stats
6. Browse top repositories and all repositories with contributions
7. View detailed contribution statistics

### Tips & Tricks
- **Add GitHub Token**: Click "Add API Token" to increase rate limits from 60 to 5,000 requests/hour
- **Click Contributors**: In repository mode, click on any contributor to see their detailed statistics
- **Expand PRs**: Click "Recent Pull Requests" to see all PRs with merge status
- **Time Filtering**: Use different time periods to see contribution trends
- **Dark Mode**: Toggle dark mode for comfortable viewing in any lighting

## Contributing
We welcome contributions! Here's how you can get started:

1. **Fork the repository** and create a new branch
2. **Pick an issue** from the [Issues tab](https://github.com/adarsh-priydarshi-5646/Fetch-github-repo-details/issues)
3. **Implement the changes** and submit a pull request
4. **Wait for review and feedback!**

## Author
**Adarsh Priydarshi**

## Contact
If you have any questions, feel free to open an issue or reach out:
- **GitHub**: [adarsh-priydarshi-5646](https://github.com/adarsh-priydarshi-5646)
- **LinkedIn**: [adarsh-p1](https://www.linkedin.com/in/adarsh-p1/)

## License
MIT License - see LICENSE file for details
