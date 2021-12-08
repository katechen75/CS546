const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 15;

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
 async addUser(username, password,email,gender,city) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      let casetestName = username.toLowerCase()
      const userCollection = await users();
      const userList = await userCollection.find({}).toArray();
      for(let i=0;i<userList.length;i++)
      {
        if(userList[i].username.toLowerCase()==casetestName) throw 'User name exists!'
      }
      let newUser = {
        username: username,
        password: hashPassword,
        email:email,
        gender:gender,
        age:'unknown',
        city:city,
        state:'unknown',
        posted:[],
        taken:[],
      };
      const newInsertInformation = await userCollection.insertOne(newUser);
      if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
      return '{userInserted:true}';
    },
    
    async checkUser(username, password) {
      if(!username) throw 'You must input a username!'
      if(typeof(username)!=='string') throw 'user name is not a valid string!'
      if(username.length<5) throw 'username should be at least 4 characters long'
      if(username.substring(0,2)=='  ') throw 'password can not be spaces!'
      if(!password) throw 'You must input a password!'
      if(typeof(password)!=='string') throw 'invalid password!'
      if(password.length<7) throw 'password should be at least 6 characters long'
      for(let i=0;i<password.length;i++){
        if(password[i]==' ') throw 'password input can not be spaces!'
      }            
      
        let compareToMatch = false;
        const userCollection = await users();
        const userfound = await userCollection.findOne({ username: username });
        if (!userfound) throw 'Either the username or password is invalid';
        compareToMatch = await bcrypt.compare(password, userfound.password);
        if(!compareToMatch) throw 'Either the username or password is invalid';
        return '{authenticated: true}'
    },
  
  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },
  async updateUser(id, firstName, lastName) {
    const user = await this.getUserById(id);
    console.log(user);

    const userUpdateInfo = {
      firstName: firstName,
      lastName: lastName,
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    return await this.getUserById(id);
  },
};

module.exports = exportedMethods;
