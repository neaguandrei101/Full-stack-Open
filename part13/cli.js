require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

app.listen(3000, async function () {
  try {
    await sequelize.authenticate();
    await Blog.sync();
    console.log("app running");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exitCode = 1;
  }
});

app.get("/api/blogs", async function (req, res) {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

app.post("/api/blogs", async function (req, res) {
  const blog = Blog.build(req.body);

  try {
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.delete("/api/blogs/:id", async function (req, res) {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const deletedBlogs = blog.destroy();
    res.status(204).json({ message: `deleted blogs: ${deletedBlogs}` });
  } catch (e) {
    res.status(400).json(e);
  }
});
