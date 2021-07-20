const qraphql = require("graphql");
const RootQuery = require("../queries");
const Mutations = require("../mutations");
const { GraphQLSchema } = qraphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
