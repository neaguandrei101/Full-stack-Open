const express = require("express");
const { getAsync } = require("../redis");
const router = express.Router();

router.get("/", async (_, res) => {
  let statistics = await getAsync("added_todos");

  statistics = statistics ? statistics : 0;

  res.json(statistics);
});

module.exports = router;
