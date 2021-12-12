const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const users = require("./users");
const uuid = require("uuid");
const { ObjectId } = require('mongodb');
//const fs = require('gridfs');

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

  //GET BY ID
  async getPostByPosterName(username) {
    let allPosts = [];
    const postCollection = await posts();
    const post = await this.getAllPosts();
  

    for (let i=0; i<post.length; i++){
      if (post[i].poster.name.toLowerCase().includes(username.toLowerCase())){
        allPosts.push(post[i]);
      }
    }
    if (!allPosts) throw "User has made no posts.";
    return allPosts;
  },


  //CREATE POST
  async addPost(title, description, category, image, location, username) {
    const postCollection = await posts();
    //fs = gridfs.GridFS(postCollection);
    const userThatPosted = await users.getUserByUserName(username);

    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth();
    let cYear = currentDate.getFullYear();
    const date = new Date(cYear, cMonth, cDay);
    let newdate = date.toDateString();

    let newPost = {
      title: title,
      description: description,
      datePosted: newdate,
      category: category,
      imageFile: image,
      location: location,
      availability: "available",
      comments: [],
      poster: {
        id: userThatPosted._id,
        name: `${userThatPosted.username} ${userThatPosted.email}`,
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
  async updatePost(availability, postId) {
    const postCollection = await posts();
    //const userThatPosted = await users.getUserById(posterId);

    let updatedPost = {
      availability: availability,
      // poster: {
      //   id: posterId,
      //   name: `${userThatPosted.username} ${userThatPosted.email}`,
      // },
    };
    const updatedInfo = await postCollection.updateOne({_id: postId},{ $set: {availability: availability}});
        
    let allPosts = await this.getPostById(postId);
    return allPosts;

    // const updateInfo = await postCollection.updateOne(
    //   { availability: availability },
    //   { $set: updatedPost }
    // );
    // if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    //   throw "Update failed";
    // return this.getPostById(id);
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

  //SORT POST
  async sortPost(availability) {
    let sortPost = [];
    
    const posts = mongoCollections.posts;
    const postCollection = await posts();
    const post = await this.getAllPosts();

    if ((availability.toLowerCase() == 'taken') || (availability.toLowerCase() == 'available')){
      for (let i=0; i<post.length; i++){
        if (post[i].availability.toLowerCase() == availability.toLowerCase()){
          sortPost.push(post[i]);
        }
      }
    }
    if (post.length > 1){
      if ((availability.toLowerCase() == 'newest') || (availability.toLowerCase() == 'oldest')){
        if (availability.toLowerCase() == 'newest'){
          sortPost.sort((a, b) => (a.dateposted > b.dateposted) ? 1 : -1);
        } else {
          sortPost.sort((a, b) => (a.dateposted < b.dateposted) ? 1 : -1);
        }
      }
    }

    if ((availability.toLowerCase() == 'furniture') || (availability.toLowerCase() == 'household')){
      for (let i=0; i<post.length; i++){
        if (post[i].category.toLowerCase() == availability.toLowerCase()){
          sortPost.push(post[i]);
        }
      }
    }

    if ((sortPost.length > 1) && (availability !== 'oldest')){
      sortPost.sort((a, b) => (a.dateposted > b.dateposted) ? 1 : -1)
    }

    return sortPost;
  },
};

module.exports = exportedMethods;