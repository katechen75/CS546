let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const posts2 = require("./posts");
const verify = require('./verify');

let exportedMethods = {
  //interactions with posts
  //create interaction
  //interaction info
  //remove interaction
  async getCommentById(commentId) {
        if (!verify.validString(commentId)) throw 'Comment id is not a valid string.';

        let parsedId = ObjectId(commentId);
    
        const commentCollection = await comments();
        let comment = await commentCollection.findOne({ _id: parsedId });
        if (comment === null) throw 'No comment with that id.';
        comment._id = comment._id.toString();

        return comment;
    },
   //create interaction
  async createComment(postId, userId, text) {
        if (!verify.validString(postId)) throw 'Post id is not a valid string.';
        if (!verify.validString(userId))   throw 'User id is not a valid string.';
        if (!verify.validString(text))     throw 'Text is not a valid string.';
        
        let newComment = {postId: postId, userId: userId, text: text};
        const commentCollection = await comments();
        const insertInfo = await commentCollection.insertOne(newComment);
        if (insertInfo.insertedCount === 0) throw 'Could not add comment.';
    
        const newId = insertInfo.insertedId;
        const findComment = await this.getCommentById(newId.toString());

        return findComment;
    }
    //remove interaction
   async deleteComment(commentId) {
        if (!verify.validString(commentId)) throw 'Comment id is not a valid string.';
        
        const commentCollection = await comments();
        const deletionInfo = await commentCollection.deleteOne({ _id: ObjectId(commentId) });
        if (deletionInfo.deletedCount === 0) throw `Could not delete comment with id of ${commentId}.`;

        return; 
    },
     async getAllComments(postId) {
        if (!verify.validString(postId)) throw 'Post id is not a valid string.';
        
        const commentCollection = await comments();
        const commentList = await commentCollection.find({'postId': { $eq: postId}}).toArray();
        for (let i of commentList) {
            i._id = i._id.toString();
        }

        return commentList;
    },
};

module.exports = exportedMethods;
