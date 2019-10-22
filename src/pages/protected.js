import React from 'react';
import { Router } from '@reach/router';
import ProtectedList from '../components/protectedList';
import ProtectedBlog from '../components/protectedBlog';

const Protected = () => (
  <Router>
    <ProtectedList path="/protected" />
    <ProtectedBlog path="/protected/:slug" />
  </Router>
);

export default Protected;
