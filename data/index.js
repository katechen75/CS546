const postData = require("./posts");
const userData = require("./users");
const commentData = require("./comments");
//const locationData = require("./location");

module.exports = {
  users: userData,
  posts: postData,
  comments: commentData,
  //location: locationData,
};
