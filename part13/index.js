const { PORT } = require("./util/config");
const Blog = require("./models/Blog");
const { connectToDatabase } = require("./util/db");
const blogsRouter = require("./controllers/blogs");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

(async () => {
  await connectToDatabase();
  await Blog.sync();

  app.listen(PORT, async () => {
    console.warn(`Server running on port ${PORT}`);
  });
})();
