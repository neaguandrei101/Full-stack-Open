const { Blog, User } = require("../models/modelConfig");
const router = require("express").Router();

router.get("/", async function (req, res) {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });

  res.json(blogs);
});

router.post("/", async function (req, res) {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
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

router.put("/:id", async function (req, res) {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    try {
      blog.likes = req.body.likes;
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;
