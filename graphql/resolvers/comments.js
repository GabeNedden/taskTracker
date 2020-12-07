const { UserInputError, AuthenticationError } = require('apollo-server');
const   checkAuth        = require('../../utilities/check-auth');
const   Project             = require('../../models/Project');

module.exports = {
    Mutation: {
        createComment: async (_, { projectId, taskId, body }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }

            const project = await Project.findById(projectId);
            
            if(project){
                const taskIndex = project.tasks.findIndex(c => c.id === taskId);

                project.tasks[taskIndex].comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                
                await project.save();
                return project

            } else throw new UserInputError('Task not found');
        },
        async deleteComment(_, { projectId, taskID, commentId }, context){
            const { username } = checkAuth(context);

            const project = await Project.findById(projectId);
            const task = await project.tasks.findById(taskID);

            if(task){
                const commentIndex = task.comments.findIndex(c => c.id === commentId);

                if(task.comments[commentIndex].username === username){
                    task.comments.splice(commentIndex, 1);
                    await task.save();
                    return task;
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
};