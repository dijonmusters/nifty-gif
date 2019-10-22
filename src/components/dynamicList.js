import React from 'react';
import { Link } from 'gatsby';
import useRequest from '../hooks/useRequest';
import Layout from '../components/layout';
import styled from 'styled-components';
import { API_URL as api } from '../config/api.json';

const renderBlog = ({ title, content, slug }) => (
  <section key={title}>
    <Link to={`/dynamic/${slug}`}>
      <h1>{title}</h1>
    </Link>
    <p dangerouslySetInnerHTML={{ __html: content }} />
  </section>
);

const DynamicList = props => {
  const url = `${api}/dynamic`;
  const response = useRequest(url);

  return (
    <Layout location={props.location} title="dynamic">
      {response ? response.map(renderBlog) : <p>Loading...</p>}
    </Layout>
  );
};

export default DynamicList;
