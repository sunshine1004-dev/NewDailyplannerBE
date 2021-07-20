const qraphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLObjectType, GraphQLString } = qraphql;

const User = require("../models/user");

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponseType",
  fields: () => ({
    token: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    error: { type: GraphQLString },
  }),
});

module.exports = {
  login: {
    type: LoginResponseType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },

    async resolve(_, { email, password }) {
      try {
        // check if the email is correct
        const user = await User.findOne({ email });
        if (!user) {
          return {
            error: "User not found",
          };
        }

        // check if password is correct
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          return {
            error: "Wrong password",
          };
        }

        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

        return {
          token,
          email,
          role: user.role,
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
  register: {
    type: LoginResponseType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },

    async resolve(_, { email, password }) {
      try {
        // check if the email is correct
        const user = await User.findOne({ email });
        if (user) {
          return {
            error: "User already exists!",
          };
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
          email,
          username: email,
          password: hash,
          role: "user",
        });
        const result = await newUser.save();
        const token = jwt.sign({ userId: result._id }, process.env.APP_SECRET);
        return {
          token,
          email,
          role: "user",
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
};
