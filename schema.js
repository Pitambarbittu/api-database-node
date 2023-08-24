const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    
        projectId: {
            type: Number,
            unique:true,
            required: false
        },
        displayName: {
            type: String,
            required: false
        },
        projectName: {
            type: String,
            required: false
        },
        projectKey: {
            type: String,
            required: false
        },
        projectTypeKey: {
            type: String,
            required: false
        },
        avatarURI:{
            type:String,
            required: false
        },
        name: {
            type: String,
            required: false
        }
});
const Posts = mongoose.model('Post', postSchema);

module.exports = Posts


