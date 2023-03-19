const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const express = require("express");
// const cors = require("cors");
const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

(async () => {
  await connectToDatabase();

  app.listen(PORT, async () => {
    console.info(`Server running on port ${PORT}`);
  });
})();
