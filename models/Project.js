const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    name: String,
    username: String,
    createdAt: String,
    description: String,
    tasks: [{   
        name: String,
        description: String,
        createdAt: String,
        comments: [{
                      body: String,
                      username: String,
                      createdAt: String
                }],
        points: [{
                      username: String,
                      createdAt: String
                }]                 
            }],
    user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
    }
});

module.exports = model('Project', projectSchema);
