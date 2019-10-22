import React from 'react';
import { Link } from 'gatsby';
import useRequest from '../hooks/useRequest';
import Layout from '../components/layout';
import styled from 'styled-components';
import { API_URL as api } from '../config/api.json';

const renderBlogs = props => {
  const { title, content, slug } = props;
  return (
    <section key={title}>
      <Link to={`/protected/${slug}`}>
        <h1>{title}</h1>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};
const ProtectedList = props => {
  const url = `${api}/protected`;
  const response = useRequest(url, true);

  return (
    <Layout location={props.location} title="protected">
      {response ? response.map(renderBlogs) : <p>Loading...</p>}
    </Layout>
  );
};

export default ProtectedList;
