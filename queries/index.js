const qraphql = require("graphql");
const UserQueries = require("./users");
const DayQueries = require("./days");
const TodoQueries = require("./todos");
const TodoItemQueries = require("./todoItems");
const ExpenseQueries = require("./expenses");
const { GraphQLObjectType } = qraphql;

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...UserQueries,
    ...DayQueries,
    ...TodoQueries,
    ...TodoItemQueries,
    ...ExpenseQueries,
  },
});
