let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const posts2 = require("./posts");

let exportedMethods = {
  //interactions with posts
  //create interaction
  //interaction info
  //remove interaction
};

module.exports = exportedMethods;
