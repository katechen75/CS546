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
  async createComment(reviewId, userId, text) {
        if (!verify.validString(reviewId)) throw 'Review id is not a valid string.';
        if (!verify.validString(userId))   throw 'User id is not a valid string.';
        if (!verify.validString(text))     throw 'Text is not a valid string.';
        
        /* Add new comment to DB */
        let newComment = {reviewId: reviewId, userId: userId, text: text};
        const commentCollection = await comments();
        const insertInfo = await commentCollection.insertOne(newComment);
        if (insertInfo.insertedCount === 0) throw 'Could not add comment.';
    
        const newId = insertInfo.insertedId;
        const finComment = await this.getCommentById(newId.toString());

        return finComment;
    }
   async deleteComment(commentId) {
        if (!verify.validString(commentId)) throw 'Comment id is not a valid string.';
        
        const commentCollection = await comments();
        const deletionInfo = await commentCollection.deleteOne({ _id: ObjectId(commentId) });
        if (deletionInfo.deletedCount === 0) throw `Could not delete comment with id of ${commentId}.`;

        return; 
    },
     async getAllCommentsOfReview(reviewId) {
        if (!verify.validString(reviewId)) throw 'Review id is not a valid string.';
        
        const commentCollection = await comments();
        const commentList = await commentCollection.find({'reviewId': { $eq: reviewId}}).toArray();
        for (let x of commentList) {
            x._id = x._id.toString();
        }

        return commentList;
    },
};

module.exports = exportedMethods;
