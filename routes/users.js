const express = require('express');
const router = express.Router();
const users = require("../data/users");

//Home Page Route
router.get("/", async (req, res) => {
    if (req.session.user) {
        res.render('users/homePage');
    } else {
        res.render('users/homePage')
    }
});

//LogIn Page Route
router.get("/login", async (req, res) => {
    if (req.session.user) {
        res.render('users/homePage');
    } else {
    res.render('users/loginPage')
    }
});

//LogIn Page POST Route
// router.post("/login", async (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;

//     if ((username) && (password)){

//         if ((!username) || (!password)) {
//             res.status(400).render('users/loginPage', {error: 'No Username/Password inputted!'});
//             return;
//         }
//         if ((typeof username != 'string') || (!username.trim().length)) {
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if ((typeof password != 'string') || (!password.trim().length)) {
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if (username.indexOf(' ') >=0){
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//         if (password.indexOf(' ') >=0){
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if (username.length < 4){
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//         if (password.length < 6){
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         var alphanum = /^[0-9a-zA-Z]+$/;
//         if (!username.match(alphanum)){
//             res.status(400).render('users/loginPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//     }

//     try {
//         let auth = {};
//         auth = await users.checkUser(username, password);

//         if (auth.authenticated == true) {
//             req.session.user = {username: username, password: password};
//             sess = req.session.user;
//             res.cookie("AuthCookie", req.session,false, true);
//             res.redirect("/private");

//         } else {
//             res.status(400).render('users/loginPage', {error: e});
//             return;
//         }
//     }
//     catch (e) {
//         if ((username == '') && (password == '')){
//             res.status(400).render('users/loginPage', {error: 'Username/Password must be provided.'});
//             return;
//         }
//         if ((!username) && (!password)){
//             res.status(400).render('users/loginPage');
//             return;

//         } else {
//             res.status(400).render('users/loginPage', {error: e});
//             return;
//         }
//     }
// });

//SignUp Page Route
router.get("/signup", async (req, res) => {
    if (req.session.user){
        res.redirect('/private');
    } else{
        res.render('users/signupPage');
    }
});


//SignUp Page POST Route
// router.post("/signup", async (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;

//     if ((username) && (password)){

//         if ((!username) || (!username)) {
//             res.status(400).render('users/signupPage', {error: 'No Username/Password inputted!'});
//             return;
//         }
//         if ((typeof username != 'string') || (!username.trim().length)) {
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if ((typeof password != 'string') || (!password.trim().length)) {
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if (username.indexOf(' ') >=0){
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//         if (password.indexOf(' ') >=0){
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         if (username.length < 4){
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//         if (password.length < 6){
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }

//         var alphanum = /^[0-9a-zA-Z]+$/;
//         if (!username.match(alphanum)){
//             res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//             return;
//         }
//     }
    
//     try {
//         let create = await users.createUser(username, password);

//         if (!create){
//             res.status(500).render('users/signupPage', {error: 'Internal Server Error'});
//             return;

//         } else {
//             res.render('users/loginPage');
//             return;
//         }
//     }
//     catch (e) {
//         if ((username == '') && (password == '')){
//             res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
//             return;
//         }
//         if ((!username) && (!password)){
//             res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
//             return;

//         } else {
//             res.status(400).render('users/signupPage', {error: e});
//             return;
//         }
//     }
// });


//get /private
// router.get("/private", async (req, res) => {
//     if (req.session.user){
//         res.render('users/userPage', {user: req.session.user});
//     }
// });


//get /post
// router.get("/posting", async (req, res) => {
//     if (req.session.user){
//         res.render('users/postingPage');
//     }
// });


//SignUp Page POST Route
// router.post("/posting", async (req, res) => {
//     // let username = req.body.username;
//     // let password = req.body.password;

//     // if ((username) && (password)){

//     //     if ((!username) || (!username)) {
//     //         res.status(400).render('users/signupPage', {error: 'No Username/Password inputted!'});
//     //         return;
//     //     }
//     //     if ((typeof username != 'string') || (!username.trim().length)) {
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }

//     //     if ((typeof password != 'string') || (!password.trim().length)) {
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }

//     //     if (username.indexOf(' ') >=0){
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }
//     //     if (password.indexOf(' ') >=0){
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }

//     //     if (username.length < 4){
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }
//     //     if (password.length < 6){
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }

//     //     var alphanum = /^[0-9a-zA-Z]+$/;
//     //     if (!username.match(alphanum)){
//     //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
//     //         return;
//     //     }
//     // }
    
//     try {
//         let createPost = await users.createPost(description, category, image, location);

//         if (!create){
//             res.status(500).render('users/signupPage', {error: 'Internal Server Error'});
//             return;

//         } else {
//             res.render('users/listingPage' , {description: description, category: category, image: image, location: location});
//             return;
//         }
//     }
//     catch (e) {
//         // if ((username == '') && (password == '')){
//         //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
//         //     return;
//         // }
//         // if ((!username) && (!password)){
//         //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
//         //     return;

//         // } else {
//         //     res.status(400).render('users/signupPage', {error: e});
//         //     return;
//         // }
//     }
// });


module.exports = router;