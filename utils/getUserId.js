const jwt = require("jsonwebtoken");

module.exports = (req) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("Not authenticated!");
  const token = authorization.replace("Bearer ", "");
  const { userId } = jwt.verify(token, process.env.APP_SECRET);
  if (!userId) throw new Error("Not authenticated!");
  return userId;
};
