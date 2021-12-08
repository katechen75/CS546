const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const users = require("./users");
const uuid = require("uuid");

let exportedMethods = {


  //GET ALL
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },


  //GET BY ID
  async getPostById(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });

    if (!post) throw "Post not found";
    return post;
  },


  //CREATE POST
  async addPost(title, description, location, posterId) {
    const postCollection = await posts();
    const userThatPosted = await users.getUserById(posterId);

    let newPost = {
      title: title,
      description: description,
      //imageURL: image,
      location: location,
      poster: {
        id: posterId,
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`,
      },
      _id: uuid.v4(),
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";

    return this.getPostById(newInsertInformation.insertedId);
  },


  //REMOVE POST
  async removePost(id) {
    const postCollection = await posts();
    const deletionInfo = await postCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
      throw `Could not delete post with id of ${id}`;
    return true;
  },


  //UPDATE POST
  async updatePost(id, title, body, posterId) {
    const postCollection = await posts();
    const userThatPosted = await users.getUserById(posterId);

    let updatedPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: userThatPosted.name,
      },
    };
    const updateInfo = await postCollection.updateOne(
      { _id: id },
      { $set: updatedPost }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";
    return this.getPostById(id);
  },


//SEARCH POST
  async searchPost(searchTerm) {
    let searchPost = [];
    
    const posts = mongoCollections.posts;
    const postCollection = await posts();
    const post = await this.getAllPosts();
  

    for (let i=0; i<post.length; i++){
      if ((post[i].title.toLowerCase().includes(searchTerm.toLowerCase())) || (post[i].description.toLowerCase().includes(searchTerm.toLowerCase()))){
        searchPost.push(post[i]);
      }
    }

    return searchPost;
  },
};

module.exports = exportedMethods;
