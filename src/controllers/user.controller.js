const {User, Post} = require("./../models");
const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const { aggregate } = require("../models/User");

module.exports.createUser = async (req, res, next) => {
  const {body} = req;
  try{
    const newUserInst = new User(body);
    const newUser = await newUserInst.save();
    if(!newUser){
      return next(createHttpError(400, 'Bad request'));
    }
    res.status(201).send({data: newUser});
  } catch(err){
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find().limit(10).skip(0)
    if(!foundUsers){
      return next(createHttpError(404, 'Not found'));
    }
    res.status(200).send({data: foundUsers});
  } catch (err) {
    next(err)
  }
};

module.exports.getUserById = async (req, res, next) => {
  const {userId} = req.params;
  try {
    const foundUser = await User.findById(userId)
    if(!foundUser){
      return next(createHttpError(404, 'Not found'));
    }
    res.status(200).send({data: foundUser});
  } catch (err) {
    next(err)
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const {userId} = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser){
      return next(createHttpError(404, 'Not found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: {userId},
    body
  } = req;
  try {
    const updUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true
    });
    console.log(`Test ${updUser}`)
    if(!updUser){
      return next(createHttpError(404, 'Not found'));
    }
    res.status(200).send({data: updUser});
  } catch (err) {
    next(err);
  }
};

module.exports.createPostByUser = async(req, res, next) => {
  const {
    params: {userId},
    body
  } = req;
  try {
    const foundUser = await User.findById(userId);
    if(!foundUser){
      return next(createHttpError(404, 'Not found'));
    }
    const newPostInst = new Post({
      ...body,
      userId: mongoose.Types.ObjectId(userId)
    });
    const newPost = await newPostInst.save();
    if(!newPost){
      return next(createHttpError(400, 'Bad request'));
    }
    res.status(201).send({data: newPost});
  } catch (err) {
    next(err)
  }
};

module.exports.getPostsByUser = async(req, res, next) => {
  const {userId} = req.params;
  try {
    const foundPosts = await User.aggregate()
      .match({_id: mongoose.Types.ObjectId(userId)})
      .lookup({
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'postsForUser'
      })
      .project({postsForUser: 1, _id: 0});
    if(!foundPosts.length){
      return next(createHttpError(404, 'Not found'))
    }
    res.status(200).send({data: foundPosts});
  } catch (err) {
    next(err)
  }
};