const router = require("express").Router();
const { User, Blog } = require("../models/modelConfig");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Blog,
        as: "blogsToRead",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: {
          attributes: ["read"], //TODO add id in readingList instead of composite key
        },
      },
    ],
  });

  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  });

  if (!user) {
    res.status(404).json({ message: "Not found" });
  }

  const updateValues = {
    id: req.body.id,
    name: req.body.name,
    username: req.body.username,
  };

  try {
    const updatedUser = await user.update(updateValues);
    res.json(updatedUser);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.message });
    }
    res.status(400).json({ error });
  }
});

module.exports = router;
