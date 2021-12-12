const express = require('express');
const app = express();
const session = require('express-session')
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
//const connection = require('./config/db');
app.use('/public', static);
const path = require('path');
const crypto = require('crypto');
const settings = require('./config/settings');
const mongoConfig = settings.mongoConfig;
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

sess = {};

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true,
}));

app.use('/login', (req, res, next) => {
    if (req.session.user) {
       // return res.redirect('users/homePage');
       return res.render('users/homePage');
    } else {
        next();
    }
});

app.use('/signup', (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
        return res.redirect('/private');
    } else {
        next();
    }
});

app.use('/private', (req, res, next) => {
    //req.session.user = sess;
    if (!req.session.user) {
        return res.status(403).render('users/loginPage', {error: "403 Error: You are not logged-in"});
    } else {
        next();
    }
});

app.use(async (req, res, next) => {
    let authStatus = "";
    if (req.session.user) {
        authStatus = "Authenticated User";
    } else {
        authStatus = "Non-Authenticated User";
    }
    console.log('['+ new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (' + authStatus + ')');
    console.log(req.session.user)
	next();
});

// let gfs;
// const conn = mongoose.createConnection(mongoConfig.serverURL);

// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

//connection();

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
