const userRoutes = require("./users");
const signupRoutes = require("./signup");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
  app.use("/", userRoutes);
  app.use("/signup", signupRoutes);
  // app.use('/comments', commentsRoutes);
  // app.use('/posts', postsRoutes);
  // app.use('/map', mapRoutes);
  // app.use('/', (req, res) => {
  //   res.redirect('/users');
  // });
};

module.exports = constructorMethod;
