import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const GITHUB_HEADERS = {
  accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const REPOS_PER_PAGE = 20;

const fetchData = async (username: string, page: number) => {
  const response = await octokit.repos.listForUser({
    username,
    page,
    per_page: REPOS_PER_PAGE,
    headers: GITHUB_HEADERS,
  });

  return response.data.map((repo) => {
    const { svn_url, description, stargazers_count, updated_at } = repo;
    return { url: svn_url, description, stargazers_count, updated_at };
  });
};

export default fetchData;
