const { gql } = require('apollo-server');

module.exports = gql`
    type Project {
        id: ID!
        name: String!
        description: String,
        tasks: [Task],
        createdAt: String!
        username: String!
    }
    type Task {
        id: ID,
        name: String,
        description: String,
        comments: [Comment],
        createdAt: String,
        username: String,
        points: [Point]
    }
    type Comment {
        id: ID,
        body: String,
        username: String,
        createdAt: String,
    }
    type Point {
        id: ID!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getProjects: [Project]
        getProject(projectId: ID!): Project
        getTasks: [Task]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String! password: String!): User!
        createProject(name: String! description: String!): Project!
        deleteProject(projectId: ID!): String!
        createTask(projectId: ID! name: String! description: String!): Project!
        deleteTask(taskId: ID!): String!
        claimTask(taskId: ID!): Task!
        createComment(projectId: String! taskId: String! body: String!): Task!
        deleteComment(projectId: ID!, commentId: ID!): Task!
    }
    type Subscription {
        newTask: Task!
    }
`;