import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Octokit } from '@octokit/rest';
import {
  setRepoData,
  unsetRepoData,
  updateRepoData,
} from '../slices/repoSlice';

const octokit = new Octokit();

const fetchData = async (username: string, page: number) => {
  const response = await octokit.repos.listForUser({
    username,
    page,
    per_page: 20,
    headers: {
      accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return response.data.map((repo) => {
    const { svn_url, description, stargazers_count, updated_at } = repo;
    return { url: svn_url, description, stargazers_count, updated_at };
  });
};

interface Error {
  status: number;
  message: string;
}

interface UseInfiniteScrollParams {
  searchInput: string;
}

export const useInfiniteScroll = (params: UseInfiniteScrollParams) => {
  const { searchInput } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>(
    'success'
  );
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageNumber = useRef(1);
  const dispatch = useDispatch();

  const getInitialData = async () => {
    try {
      setIsLoading(true);

      const data = await fetchData(searchInput, pageNumber.current);
      pageNumber.current += 1;

      setStatus('success');
      dispatch(unsetRepoData());
      dispatch(setRepoData({ data, searchInput }));
    } catch (error) {
      dispatch(unsetRepoData());
      setStatus('error');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchInput) {
      dispatch(unsetRepoData());
      setError(null);
      setStatus('success');
      return;
    }
    pageNumber.current = 1;
    setHasNextPage(true);

    const timerId = setTimeout(() => getInitialData(), 300);

    return () => clearTimeout(timerId);
  }, [searchInput]);

  const getNextPage = async () => {
    try {
      const data = await fetchData(searchInput, pageNumber.current);
      pageNumber.current += 1;

      if (!data.length) {
        setHasNextPage(false);
      }

      dispatch(updateRepoData(data));
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setError(error);
    }
  };

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading && hasNextPage) {
        getNextPage().then(() => {
          observer.unobserve(entry.target);
        });
      }
    });
  };

  useEffect(() => {
    const div = document.getElementById('scroll');
    if (div && hasNextPage && !isLoading) {
      const observer = new IntersectionObserver(callback, {
        rootMargin: '0px 0px -100px 0px',
      });
      observer.observe(div);

      return () => observer.unobserve(div);
    }
  }, [hasNextPage, isLoading, searchInput]);

  return { isLoading, error, status };
};
