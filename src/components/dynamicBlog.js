import React from 'react';
import { Link } from 'gatsby';
import useRequest from '../hooks/useRequest';
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

const DynamicBlog = props => {
  const { slug } = props;
  const url = `${api}/dynamic/${slug}`;
  const response = useRequest(url);
  return (
    <Layout location={props.location} title="dynamic">
      {response ? renderBlog(response) : <p>Loading...</p>}
    </Layout>
  );
};

export default DynamicBlog;
