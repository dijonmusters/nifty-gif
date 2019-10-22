import { useState, useEffect } from 'react';
import useRequest from './useRequest';

const readFromCache = url => JSON.parse(localStorage.getItem(url));
const writeToCache = (url, data) =>
  localStorage.setItem(url, JSON.stringify(data));

const useCache = (url, authed = false) => {
  const [cachedResponse, setCachedResponse] = useState();
  const response = useRequest(url, authed);

  useEffect(() => {
    const cached = readFromCache(url);
    if (cached) {
      setCachedResponse(cached);
    }
  }, []);

  useEffect(() => {
    if (response) {
      writeToCache(url, response);
      setCachedResponse(response);
    }
  }, [response]);

  return cachedResponse;
};

export default useCache;
