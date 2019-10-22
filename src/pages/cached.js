import React from 'react';
import { Router } from '@reach/router';
import CachedList from '../components/cachedList';
import CachedBlog from '../components/cachedBlog';

const Cached = () => (
  <Router>
    <CachedList path="/cached" />
    <CachedBlog path="/cached/:slug" />
  </Router>
);

export default Cached;
