const userRoutes = require('./users');
const commentsRoutes = require('./comments');
const postsRoutes = require('./posts');
const mapRoutes = require('./map');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/comments', commentsRoutes);
  app.use('/posts', postsRoutes);
  app.use('/map', mapRoutes);
  app.use('/', (req, res) => {
    res.redirect('/users');
  });
};

module.exports = constructorMethod;