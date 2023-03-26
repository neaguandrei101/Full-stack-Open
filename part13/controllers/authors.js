const { Blog, User } = require("../models/modelConfig");
const { sequelize } = require("../util/db");
const router = require("express").Router();

router.get("/", async function (req, res) {
  try {
    const authors = await User.findAll({
      attributes: [
        "name",
        [sequelize.fn("COUNT", sequelize.col("user_id")), "articles"],
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("SUM", sequelize.col("likes")),
            0
          ),
          "likes",
        ],
      ],
      raw: true,
      include: {
        model: Blog,
        attributes: [],
        required: false,
      },
      group: "name",
    });

    res.json(authors);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
