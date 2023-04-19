const jwt = require("jsonwebtoken");
const router = require("express").Router();
const crypto = require("crypto");

const { SECRET } = require("../util/config");
const { User } = require("../models/modelConfig");

router.post("/jwt", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.post("/srv-sess", (req, res) => {
  const sessionId = crypto.randomBytes(8).toString("base64");

  res.cookie("PersistentSessionID", sessionId);
  res.sendStatus(200);
});

module.exports = router;
