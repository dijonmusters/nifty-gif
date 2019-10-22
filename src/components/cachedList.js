import React from 'react';
import { Link } from 'gatsby';
import useCache from '../hooks/useCache';
import Layout from '../components/layout';
import styled from 'styled-components';
import { API_URL as api } from '../config/api.json';

const renderBlogs = ({ title, content, slug }) => {
  return (
    <section key={title}>
      <Link to={`/cached/${slug}`}>
        <h1>{title}</h1>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};

const CachedList = props => {
  const url = `${api}/protected`;
  const response = useCache(url, true);
  return (
    <Layout location={props.location} title="cached">
      {response ? response.map(renderBlogs) : <p>Loading...</p>}
    </Layout>
  );
};

export default CachedList;
