const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { SheetType } = require("../schema/types");
const Day = require("../models/day");
const getUserId = require("../utils/getUserId");

module.exports = {
  sheet: {
    type: SheetType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(_, args, req) {
      const userId = getUserId(req);
      const sheet = await Day.findById(args.id);
      if (!sheet) {
        return {
          error: "Not Found!",
        };
      } else {
        if (String(sheet.userId) !== String(userId)) {
          return {
            error: "Not yours!",
          };
        } else {
          return sheet;
        }
      }
    },
  },
};
