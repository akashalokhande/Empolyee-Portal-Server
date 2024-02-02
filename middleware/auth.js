const jwt = require("jsonwebtoken");
const config = require("../Config/config");

const verifyToken = async (req, resp, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  if (!token) {
    resp
      .status(200)
      .send({ success: false, msg: "A Token is required for authentication." });
  } else {
  }
  try {
    const decode = jwt.verify(token, config.secret_jwt,);
    req.user = decode;
  } catch (error) {
    resp.status(400).send(error);
  }
  return next();
};

module.exports = verifyToken;
