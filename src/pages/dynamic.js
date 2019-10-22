import React from 'react';
import { Router } from '@reach/router';
import DynamicList from '../components/dynamicList';
import DynamicBlog from '../components/dynamicBlog';

const Dynamic = () => (
  <Router>
    <DynamicList path="/dynamic" />
    <DynamicBlog path="/dynamic/:slug" />
  </Router>
);

export default Dynamic;
