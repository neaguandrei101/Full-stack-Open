const { Blog, User } = require("../models/modelConfig");
const { tokenExtractor } = require("../util/middlewares");
const { Op } = require("sequelize");
const router = require("express").Router();

router.get("/", async function (req, res) {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: { [Op.substring]: req.query.search },
        },
        {
          author: { [Op.substring]: req.query.search },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });

  res.json(blogs);
});

router.post("/", tokenExtractor, async function (req, res) {
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

router.delete("/:id", tokenExtractor, async function (req, res) {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    res.status(404).end();
  }

  if (req.decodedToken.id !== blog.userId) {
    res.status(401).json({
      error: "deletion of a blog only possible for the user who added the blog",
    });
  }

  try {
    const deletedBlog = blog.destroy();
    res.status(204).json({ message: `deleted blog: ${deletedBlog}` });
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
