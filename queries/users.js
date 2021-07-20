const User = require("../models/user");
const { UserType } = require("../schema/types");
const getUserId = require("../utils/getUserId");

module.exports = {
  me: {
    type: UserType,
    args: null,
    async resolve(_, args, req) {
      const userId = getUserId(req);
      const user = await User.findById(userId).select("_id email role");
      return user;
    },
  },
};
