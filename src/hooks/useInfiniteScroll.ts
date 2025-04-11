import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setRepoData,
  unsetRepoData,
  updateRepoData,
} from '../slices/repoSlice';
import fetchData from '../api/fetchData';

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

  useEffect(() => {
    if (!searchInput) {
      dispatch(unsetRepoData());
      setError(null);
      setStatus('success');
      return;
    }
    pageNumber.current = 1;
    setHasNextPage(true);

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

    const timerId = setTimeout(() => getInitialData(), 300);

    return () => clearTimeout(timerId);
  }, [searchInput, dispatch]);

  const getNextPage = useCallback(async () => {
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
  }, [dispatch, searchInput]);

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        getNextPage();
      }
    },
    [getNextPage]
  );

  useEffect(() => {
    const intersectionTarget = document.querySelector('#scroll');

    if (!intersectionTarget || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(callback);

    observer.observe(intersectionTarget);
    getNextPage();

    return () => observer.unobserve(intersectionTarget);
  }, [isLoading, getNextPage, callback]);

  return { isLoading, error, status, hasNextPage };
};
