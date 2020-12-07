const { UserInputError, AuthenticationError } = require('apollo-server');
const { findBreakingChanges } = require('graphql');

const Project = require('../../models/Project');
const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Query: {
            async getTasks(){
                try{
                    const tasks = await Task.find().sort({ createdAt: -1 });
                    return tasks;
                } catch(err){
                    throw new Error(err);
                }
            }
    },

    Mutation: {
        createTask: async (_, { projectId, name, description }, context) => {
            const { username } = checkAuth(context);
            if(name.trim() === ''){
                throw new UserInputError('Empty task name', {
                    errors: {
                        name: 'Task name must not be empty'
                    }
                })
            }

            const project = await Project.findById(projectId);
            
            if(project){
                project.tasks.unshift({
                    name,
                    description,
                    username,
                    projectId,
                    createdAt: new Date().toISOString()
                });
                
                await project.save();

                context.pubsub.publish('NEW_TASK', {
                    newTask: project.tasks
                });

                return project;
        
            } else throw new UserInputError('Project not found');
        },

        async deleteTask(_, { taskId }, context){
            const user = checkAuth(context);

            try {
                const task = await Task.findById(taskId);
                if (user.username === task.username){
                    await task.deleteOne();
                    return 'Task deleted succesfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async claimTask(_, { taskId }, context){
            const { username } = checkAuth(context);

            const task = await Task.findById(taskId);
            if(task){
                if(task.points.find(point => point.username === username)){
                    //task already claimed, unclaim
                    task.points = task.points.filter(point => point.username !== username);
                } else {
                    //not claimed, claim it
                    task.points.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await task.save();
                return task;
            } else throw new UserInputError('Task not found');
        }
    },
    Subscription: {
        newTask: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_TASK')
        }
    }
};