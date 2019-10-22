import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';

const Heading = styled.h3`
  margin-bottom: 0.5rem;
`;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;

const renderPost = ({ node: post }) => {
  const title = post.frontmatter.title || post.fields.slug;
  return (
    <article key={post.fields.slug}>
      <Heading>
        <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
          {title}
        </Link>
      </Heading>
      <small>{post.frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: post.frontmatter.description || post.excerpt,
        }}
      />
    </article>
  );
};

const BlogIndex = props => {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={props.location} title={siteTitle}>
      {posts.map(renderPost)}
    </Layout>
  );
};

export default BlogIndex;
