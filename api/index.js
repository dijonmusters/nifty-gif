require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { jwtCheck, getToken } = require('./utils/auth');
const blogs = require('./content/blogs.json');
const { connectDb } = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/token', async (req, res) => {
  const token = await getToken();
  res.send(token);
});

app.get('/dynamic', (req, res) => {
  res.send(blogs);
});

app.get('/dynamic/:slug', (req, res) => {
  const { slug } = req.params;
  const blog = blogs.find(b => b.slug === slug);
  res.send(blog);
});

app.get('/protected', jwtCheck, async (req, res) => {
  const { Blog } = await connectDb();
  const protectedBlogs = await Blog.find();
  res.send(protectedBlogs);
});

app.get('/protected/:slug', jwtCheck, async (req, res) => {
  const { slug } = req.params;
  const { Blog } = await connectDb();
  const protectedBlog = await Blog.findOne({ slug });
  res.send(protectedBlog);
});

app.post('/protected', async (req, res) => {
  const { blogs } = req.body;
  const { Blog } = await connectDb();
  await Blog.deleteMany();
  await Blog.insertMany(blogs);
  res.send(blogs);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
