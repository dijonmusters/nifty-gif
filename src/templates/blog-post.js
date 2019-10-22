import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Bio from '../components/bio';
import Layout from '../components/layout';

const Heading = styled.h1`
  margin-top: rhythm(1);
  margin-bottom: 0;
`;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

const BlogPostTemplate = props => {
  const {
    markdownRemark: {
      html,
      frontmatter: { title, date },
    },
  } = props.data;

  return (
    <Layout location={props.location} title={title}>
      <Heading>{title}</Heading>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
    </Layout>
  );
};

export default BlogPostTemplate;
