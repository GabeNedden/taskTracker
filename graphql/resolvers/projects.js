const { AuthenticationError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');

const Project = require('../../models/Project')
const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Query: {
        async getProjects(){
            try{
                const projects = await Project.find().sort({ createdAt: -1 });
                return projects;
            } catch(err){
                throw new Error(err);
            }
        },
        async getProject(_, { projectId }){
            try{
                const project = await Project.findById(projectId);
                if(project){
                    return project;
                } else {
                    throw new Error('Project not found')
                }
            } catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createProject(_, { name, description }, context){
            const user = checkAuth(context);

            if(name.trim() === ''){
                throw new Error('Project name must not be empty');
            }
            if(description.trim() === ''){
                throw new Error('Project description must not be empty');
            }

            const newProject = new Project({
                name,
                description,
                user: user.id,
                username:user.username,
                createdAt: new Date().toISOString()
            });

            const project = await newProject.save();

            return project
        },

        async deleteProject(_, { projectId }, context){
            const user = checkAuth(context);

            try{
                const project = await Project.findById(projectId);
                if(user.username === project.username){
                    await project.delete();
                    return 'Project deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err){
                throw new Error(err);
            }
        }
    }
};