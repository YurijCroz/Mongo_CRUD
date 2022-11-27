const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 1
    },
    body: {
        type: String,
        require: true,
        minLength: 1
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

const Post = mongoose.model('Post', userSchema);

module.exports = Post;