const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const axios = require('axios');

const slugify = title =>
  title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z\-]/g, '');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const Protected = path.resolve(`./src/pages/protected.js`);
  const Dynamic = path.resolve(`./src/pages/dynamic.js`);
  const Cached = path.resolve(`./src/pages/cached.js`);

  const result = await graphql(
    `
      {
        blogs: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/blog/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        protectedBlogs: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/protected/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.blogs.edges;
  const protectedBlogs = result.data.protectedBlogs.edges.map(
    ({ node: blog }) => {
      return {
        title: blog.frontmatter.title,
        content: blog.html,
        slug: slugify(blog.frontmatter.title),
      };
    }
  );

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  createPage({
    path: '/protected/:slug/',
    matchPath: '/protected/:slug/',
    component: Protected,
  });

  createPage({
    path: '/dynamic/:slug/',
    matchPath: '/dynamic/:slug/',
    component: Dynamic,
  });

  createPage({
    path: '/cached/:slug/',
    matchPath: '/cached/:slug/',
    component: Cached,
  });

  const { data: newProtectedBlogs } = await axios.post(
    'http://localhost:5000/protected',
    {
      blogs: protectedBlogs,
    }
  );

  newProtectedBlogs.forEach(b =>
    console.log(`---created page for ${b.title}---`)
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
