const qraphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
} = qraphql;

const Todo = require("../models/todo");
const TodoItem = require("../models/todoItem");

const DateScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

const ReadingType = new GraphQLObjectType({
  name: "ReadingType",
  fields: () => ({
    title: { type: GraphQLString },
    start: { type: GraphQLInt },
    end: { type: GraphQLInt },
  }),
});

const AccountabilityType = new GraphQLObjectType({
  name: "AccountabilityType",
  fields: () => ({
    done: { type: GraphQLString },
    todo: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const TodoItemActionType = new GraphQLObjectType({
  name: "TodoItemActionType",
  fields: () => ({
    _id: { type: GraphQLString },
    text: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const TodoItemType = new GraphQLObjectType({
  name: "TodoItemType",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    actions: { type: new GraphQLList(TodoItemActionType) },
    completed: { type: GraphQLBoolean },
  }),
});

const TodoType = new GraphQLObjectType({
  name: "TodoType",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    sheetId: { type: GraphQLString },
    items: {
      type: new GraphQLList(TodoItemType),
      resolve(parent, _) {
        return TodoItem.find({ todoId: parent._id });
      },
    },
    type: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
  }),
});

const TodosType = new GraphQLObjectType({
  name: "TodosType",
  fields: () => ({
    today: {
      type: TodoType,
      resolve(parent, _) {
        return Todo.findById(parent.today);
      },
    },
    tomorrow: {
      type: TodoType,
      resolve(parent, _) {
        return Todo.findById(parent.tomorrow);
      },
    },
    work: {
      type: TodoType,
      resolve(parent, _) {
        return Todo.findById(parent.work);
      },
    },
    art: {
      type: TodoType,
      resolve(parent, _) {
        return Todo.findById(parent.art);
      },
    },
  }),
});

const SheetType = new GraphQLObjectType({
  name: "SheetType",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    day: { type: GraphQLString },
    gratefulFor: { type: GraphQLString },
    affirmation: { type: GraphQLString },
    callSos: { type: GraphQLString },
    research: { type: GraphQLString },
    reading: { type: ReadingType },
    accountability: { type: AccountabilityType },
    awake: { type: GraphQLString },
    asleep: { type: GraphQLString },
    todos: { type: TodosType },
  }),
});

const ExpenseType = new GraphQLObjectType({
  name: "ExpenseType",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    createdDate: { type: DateScalarType },
  }),
});

const DeleteResponseType = new GraphQLObjectType({
  name: "DeleteResponseType",
  fields: () => ({
    result: { type: GraphQLBoolean },
  }),
});

module.exports = {
  ReadingType,
  SheetType,
  UserType,
  DateScalarType,
  TodoType,
  TodoItemType,
  TodoItemActionType,
  ExpenseType,
  DeleteResponseType,
};
