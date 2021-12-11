const express = require('express');
const router = express.Router();
const posts = require("../data/posts");
const comments = require("../data/comments");
const userdata = require("../data/users");
const upload = require("../data/uploads.js");
const GridFsStorage = require('multer-gridfs-storage');
const settings = require('../config/settings');
const mongoConfig = settings.mongoConfig;
const app = require('../app.js');
const mongooseCollections = require("../config/mongooseCollection");
const uploads = mongooseCollections.uploads;

//Home Page Route
router.get("/", async (req, res) => {
        try {
            const allPosts = await posts.getAllPosts();
            res.render('users/homePage', {posts:allPosts});
        } catch (e) {
            res.status(404);
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
        const logintest = await userdata.checkUser(loginName,loginPW);
            if(logintest=='{authenticated: true}'){
                req.session.user = {username:loginName};
                sess = req.session.user;
                res.cookie("AuthCookie", req.session,false, true);
                res.redirect('/private');
            } else {
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
router.get("/private", async (req, res) => {
    if (req.session.user){
        try{
            let userName = req.session.user.username;
            const userPosts = await posts.getPostByPosterName(userName);
            res.render('users/userPage', {user: req.session.user, userPost: userPosts});
        } catch(e) {

        }
    }
});

//get /onePost
router.get("/onePost", async (req, res) => {
    if (req.session.user){
        res.render('users/listingPage');
    } else {
        res.render('users/listingPage');
    }
});

//get /post
// router.get("/posting", async (req, res) => {
//     if (req.session.user){
//         res.render('users/postingPage');
//     } else {
//         res.render('users/postingPage');
//     }
// });


//SignUp Page POST Route
router.post("/posting", async (req, res) => {
    let itemName = req.body.title;
    let itemDescription = req.body.description;
    let itemCategory = req.body.item_category;
    let itemImageURL = req.body.item_image;
    let itemLocation = req.body.item_location;

    // if ((username) && (password)){

    //     if ((!username) || (!username)) {
    //         res.status(400).render('users/signupPage', {error: 'No Username/Password inputted!'});
    //         return;
    //     }
    //     if ((typeof username != 'string') || (!username.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if ((typeof password != 'string') || (!password.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.length < 4){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.length < 6){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     var alphanum = /^[0-9a-zA-Z]+$/;
    //     if (!username.match(alphanum)){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    // }
    
    try {
        let createPost = await posts.addPost(itemName, itemDescription, itemCategory, itemImageURL, itemLocation, sess.username);

        if (!createPost){
            res.status(500).render('users/postingPage', {error: 'Internal Server Error'});
            return;

        } else {
            res.redirect('/'); //, {name: itemName, description: itemDescription, category: itemCategory, image: itemImage, location: itemLocation});
            return;
        }
    }
    catch (e) {
        // if ((username == '') && (password == '')){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;
        // }
        // if ((!username) && (!password)){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;

        // } else {
        //     res.status(400).render('users/signupPage', {error: e});
        //     return;
        // }
    }
});


//SignUp Page POST Route
router.post("/comments/:id", async (req, res) => {
    let commentText = req.body.comment_form;
    // let itemDescription = req.body.description;
    // let itemCategory = req.body.item_category;
    // let itemImageURL = req.body.item_image;
    // let itemLocation = req.body.item_location;

    // if ((username) && (password)){

    //     if ((!username) || (!username)) {
    //         res.status(400).render('users/signupPage', {error: 'No Username/Password inputted!'});
    //         return;
    //     }
    //     if ((typeof username != 'string') || (!username.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if ((typeof password != 'string') || (!password.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.length < 4){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.length < 6){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     var alphanum = /^[0-9a-zA-Z]+$/;
    //     if (!username.match(alphanum)){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    // }
    
    try {
        let createComments = await comments.createComment(req.params.id, req.session.user.username, commentText);

        if (!createComments){
            res.status(500).render('users/postingPage', {error: 'Internal Server Error'});
            return;

        } else {
            res.redirect('/'); //, {name: itemName, description: itemDescription, category: itemCategory, image: itemImage, location: itemLocation});
            return;
        }
    }
    catch (e) {
        // if ((username == '') && (password == '')){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;
        // }
        // if ((!username) && (!password)){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;

        // } else {
        //     res.status(400).render('users/signupPage', {error: e});
        //     return;
        // }
    }
});


//UpdatePost Page POST Route
router.post("/updatePost/:id", async (req, res) => {
    let availability = req.body.updatepost_form;
    // let itemDescription = req.body.description;
    // let itemCategory = req.body.item_category;
    // let itemImageURL = req.body.item_image;
    // let itemLocation = req.body.item_location;

    // if ((username) && (password)){

    //     if ((!username) || (!username)) {
    //         res.status(400).render('users/signupPage', {error: 'No Username/Password inputted!'});
    //         return;
    //     }
    //     if ((typeof username != 'string') || (!username.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if ((typeof password != 'string') || (!password.trim().length)) {
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.indexOf(' ') >=0){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     if (username.length < 4){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    //     if (password.length < 6){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }

    //     var alphanum = /^[0-9a-zA-Z]+$/;
    //     if (!username.match(alphanum)){
    //         res.status(400).render('users/signupPage', {error: 'Username/Password inputted incorrectly'});
    //         return;
    //     }
    // }
    
    try {
        let updatePosts = await posts.updatePost(availability, req.params.id);

        if (!updatePosts){
            res.status(500).render('users/postingPage', {error: 'Internal Server Error'});
            return;

        } else {
            res.redirect('/'); //, {name: itemName, description: itemDescription, category: itemCategory, image: itemImage, location: itemLocation});
            return;
        }
    }
    catch (e) {
        // if ((username == '') && (password == '')){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;
        // }
        // if ((!username) && (!password)){
        //     res.status(400).render('users/signupPage', {error: 'Username/Password must be provided.'});
        //     return;

        // } else {
        //     res.status(400).render('users/signupPage', {error: e});
        //     return;
        // }
    }
});

const storage = new GridFsStorage({
    url: mongoConfig.serverURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
            });
        });
        }
    });

//const uploads = multer({ storage });

router.get('/posting', async (req, res) => {
    let gfs = await uploads();
    gfs.files.find().toArray((err, files) => {
      // Check if files
    if (!files || files.length === 0) {
        res.render('users/postingPage', { files: false });
    } else {
        files.map(file => {
        if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
        ) {
            file.isImage = true;
        } else {
            file.isImage = false;
        }
        });
        res.render('users/postingPage', { files: files });
    }
    });
});


module.exports = router;
