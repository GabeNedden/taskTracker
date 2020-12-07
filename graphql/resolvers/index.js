const projectResolvers  = require('./projects');
const userResolvers     = require('./users');
const taskResolvers     = require('./tasks');
const commentResolvers  = require('./comments');

module.exports = {
    Query: {
        ...projectResolvers.Query,
        ...taskResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription: {
        ...taskResolvers.Subscription
    }
};