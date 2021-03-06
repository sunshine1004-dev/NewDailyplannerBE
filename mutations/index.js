const { GraphQLObjectType } = require("graphql");
const DaysMutations = require("./days");
const UsersMutations = require("./users");
const TodosMutations = require("./todos");
const TodoItemssMutations = require("./todoItems");
const ExpensesMutations = require("./expenses");
const ThoughtssMutations = require("./thoughts");
const ThoughtItemssMutations = require("./thoughtItems");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...DaysMutations,
    ...UsersMutations,
    ...TodosMutations,
    ...TodoItemssMutations,
    ...ExpensesMutations,
    ...ThoughtssMutations,
    ...ThoughtItemssMutations,
  },
});
