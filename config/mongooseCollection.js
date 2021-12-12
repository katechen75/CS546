const dbConnection = require("./mongooseConnections");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const getCollectionFn = (collection) => {
  let _col = undefined;
  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await Grid(db, mongoose.mongo);
      _col.collection(collection);
    }
    return _col;
  };
};

module.exports = {
  uploads: getCollectionFn("uploads"),
  // users: getCollectionFn('users'),
  // reviews: getCollectionFn('reviews'),
  // comments: getCollectionFn('comments'),
  // posts: getCollectionFn('posts')
};
