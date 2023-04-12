const { ReadingList } = require("../models/modelConfig");
const router = require("express").Router();

router.post("/", async function (req, res) {
  const response = await ReadingList.create({
    userId: req.body.userId,
    blogId: req.body.blogId,
  });

  res.json(response.toJSON());
});

module.exports = router;
