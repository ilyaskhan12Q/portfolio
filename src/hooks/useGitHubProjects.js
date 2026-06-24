import { useState, useEffect } from 'react';
import { projectMetadata } from '../config/projectMetadata';

const CACHE_KEY = 'gh_projects_cache';
const CACHE_TIME_KEY = 'gh_projects_cache_time';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache

export function useGitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Check localStorage cache first to prevent GitHub rate limits
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_DURATION) {
          const parsed = JSON.parse(cachedData);
          setProjects(parsed);
          setLoading(false);
          return;
        }

        const res = await fetch('https://api.github.com/users/ilyaskhan12Q/repos?per_page=100&sort=updated');
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        const data = await res.json();

        // Map and clean raw data
        const mapped = data
          .filter((repo) => !repo.fork) // Only public original repos
          .map((repo, index) => {
            const localMeta = projectMetadata[repo.name] || {};
            
            // Format PID
            const pid = String(index + 1).padStart(4, '0');

            // Format category from topics or fallback
            const category = repo.topics && repo.topics.length > 0 
              ? repo.topics[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
              : 'Software Engineering';

            // Determine year from updated_at or created_at
            const year = repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : new Date().getFullYear().toString();

            // Extract tags/topics
            const topics = repo.topics || [];
            const stack = localMeta.stack || (repo.language ? [repo.language, ...topics.slice(0, 3)] : [...topics.slice(0, 4)]);

            // Compile links
            const links = [
              { label: 'github', url: repo.html_url }
            ];
            if (localMeta.liveUrl) {
              links.push({ label: 'live', url: localMeta.liveUrl });
            }

            return {
              slug: repo.name,
              pid,
              name: repo.name,
              fullName: repo.description ? `${repo.name} — ${repo.description}` : repo.name,
              status: localMeta.status || '[SHIPPED]',
              category,
              year,
              tagline: repo.description || 'Developer public repository.',
              description: repo.description || 'Public codebase hosted on GitHub.',
              stack,
              highlights: localMeta.longFormMarkdown 
                ? [] // Highlight items are superseded by markdown, but can remain empty or generic
                : [
                    `Primary development language: ${repo.language || 'Multi-stack'}`,
                    `GitHub Stars: ${repo.stargazers_count}`,
                    `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`
                  ],
              links,
              featured: repo.stargazers_count > 0 || !!projectMetadata[repo.name],
              stargazers_count: repo.stargazers_count,
              updated_at: repo.updated_at,
              architecture: localMeta.architecture || `[User Request] ──► [GitHub Codebase: ${repo.name}] ──► [Build Deployment]`,
              longFormMarkdown: localMeta.longFormMarkdown || `
# ${repo.name}
${repo.description || 'No description provided.'}

### Repository Telemetry
- **Primary Language**: ${repo.language || 'Not specified'}
- **Stars**: ${repo.stargazers_count}
- **Watchers**: ${repo.watchers_count || 0}
- **Forks**: ${repo.forks_count || 0}
- **Open Issues**: ${repo.open_issues_count || 0}

### System Deployment Details
This repository is public and hosted directly on GitHub. You can view the full repository contents or clone the codebase using standard git tools.
              `
            };
          });

        // Sort projects by featured first, then stargazer count, then update date
        const sorted = mapped.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify(sorted));
        localStorage.setItem(CACHE_TIME_KEY, String(now));
        
        setProjects(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch GitHub projects:', err);
        setError(err.message);
        setLoading(false);

        // Fallback to cached projects if API fails (even if expired)
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          setProjects(JSON.parse(cachedData));
        }
      }
    }

    fetchRepos();
  }, []);

  return { projects, loading, error };
}
