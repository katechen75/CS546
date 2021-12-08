const express = require('express');
const router = express.Router();
const posts = require("../data/posts");
const userdata = require("../data/users");

//Home Page Route
router.get("/", async (req, res) => {
    if (req.session.user) {
        res.render('users/homePage');
    } else {
        try {
            const allPosts = await posts.getAllPosts();
            res.render('users/homePage', {posts:allPosts});
        } catch (e) {
            res.status(404);
        }
    }
});

//LogIn Page Route
router.get("/login", async (req, res) => {
    res.render('users/loginPage')
});


router.post("/search", async (req, res) => {
    let searchTerm = req.body.search_item;
    try {
        const allPosts = await posts.searchPost(searchTerm);
        res.render('users/homePage', {posts:allPosts});
    } catch (e) {
        res.status(404);
    }
});

//LogIn Page POST Route
router.post('/login', async (req, res) => {
    const loginName = req.body.username;
    const loginPW = req.body.password;
    try{
        const logintest = await userdata.checkUser(loginName,loginPW)
            if(logintest=='{authenticated: true}'){
            req.session.user = { username:loginName };
            res.redirect('/private');
            }
            else{
            res.render('users/loginpage', { title: "Login Page" });
            }
    }
    catch (e) {
        res.render('users/loginpage', { title: "Login Page" });
    }
});


//SignUp Page GET Route
router.get('/signup', async (req, res) => {
    try {
        res.render('users/signupPage', { title: "Sign Up Page" });
    } catch (e) {
        res.sendStatus(500);
    }
});

//SignUp Page POST Route
router.post('/signup', async (req, res) => {
    const signupName = req.body.username;
    const signupPW = req.body.password1;
    const email = req.body.email;
    const gender = req.body.gender;
    const city = req.body.city;
    const NYcities = [];
    const NJcities = [];
    try {     
     // res.status(400).render('pages/signup',{ title: "Sign Up Page" , hasErrors: true,errors:errors})   
        const signuptest = await userdata.addUser(signupName,signupPW,email,gender,city);
        if(signuptest=='{userInserted:true}'){
        res.redirect('/login');
        }
    } catch(e) {
        res.status(500).json({ message: 'routes error' });
    }
});




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
