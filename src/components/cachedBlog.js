import React from 'react';
import { Link } from 'gatsby';
import useCache from '../hooks/useCache';
import Layout from '../components/layout';
import styled from 'styled-components';
import { API_URL as api } from '../config/api.json';

const renderBlog = ({ title, content }) => {
  return (
    <section key={title}>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};

const CachedBlog = props => {
  const { slug } = props;
  const url = `${api}/protected/${slug}`;
  const response = useCache(url, true);
  return (
    <Layout location={props.location} title="protected">
      {response ? renderBlog(response) : <p>Loading...</p>}
    </Layout>
  );
};

export default CachedBlog;
