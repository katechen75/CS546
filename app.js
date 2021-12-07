const express = require('express');
const app = express();
const session = require('express-session')
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

sess = {};

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true,
}));

app.use('/private', (req, res, next) => {
    req.session.user = sess;
    if (!req.session.user) {
        res.status(403).render('users/error', {error: "403 Error: You are not logged-in"});
    } else {
        next();
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        //return res.redirect('/login')
        req.method = 'GET';
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
	next();
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});