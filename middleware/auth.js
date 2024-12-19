const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");

  if (!token) return res.status(400).send({ error: "Token Not Provided" });
  try {
    let Btoken = token.split(" ");
    if (Btoken[0] === "Bearer") {
      let user = jwt.verify(Btoken[1], "jwtPrivateKey");
      req.user = await User.findById(user._id);
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  next();
}
module.exports = auth;
