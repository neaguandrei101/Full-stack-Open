const { ReadingList } = require("../models/modelConfig");
const router = require("express").Router();

router.post("/", async function (req, res) {
  const response = await ReadingList.create({
    userId: req.body.userId,
    blogId: req.body.blogId,
  });

  res.json(response.toJSON());
});

router.put("/:id", async function (req, res) {
  const response = await ReadingList.findByPk(req.params.id);

  if (response) {
    try {
      response.read = req.body.read;
      const updatedEntry = await response.save();
      res.json(updatedEntry);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;
