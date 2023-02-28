const { Blog } = require("../models/Blog");
const router = require("express").Router();

router.get("/", async function (req, res) {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.post("/", async function (req, res) {
  const blog = Blog.build(req.body);

  try {
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const deletedBlogs = blog.destroy();
    res.status(204).json({ message: `deleted blogs: ${deletedBlogs}` });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

module.exports = router;
