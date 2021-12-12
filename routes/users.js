const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const comments = require("../data/comments");
const userdata = require("../data/users");
// const upload = require("../data/uploads.js");
const GridFsStorage = require("multer-gridfs-storage");
const settings = require("../config/settings");
const mongoConfig = settings.mongoConfig;
const app = require("../app");
const mongooseCollections = require("../config/mongooseCollection");
const { users } = require("../config/mongoCollections");
const uploads = mongooseCollections.uploads;

//Home Page Route
router.get("/", async (req, res) => {
  if (req.session.user) {
    const allPosts = await posts.getAllPosts();
    res.render("users/homePage", { posts: allPosts });
  } else {
    res.render("users/loginPage");
  }
});

//LogIn Page Route
router.get("/login", async (req, res) => {
  if (req.session.user) {
    const allPosts = await posts.getAllPosts();
    res.render("users/homePage", { posts: allPosts });
  } else {
    res.status(404);
  }
});

//SearchPost POST Route
router.post("/search", async (req, res) => {
  let searchTerm = req.body.search_item;
  try {
    const allPosts = await posts.searchPost(searchTerm);
    if (!allPosts) {
      res
        .status(500)
        .render("users/homePage", { error: "No posts for this search" });
      return;
    }
    res.render("users/homePage", { posts: allPosts });
  } catch (e) {
    res.status(404);
  }
});

//LogIn Page POST Route
router.post("/login", async (req, res) => {
  const loginName = req.body.username;
  const loginPW = req.body.password;
  try {
    const logintest = await userdata.checkUser(loginName, loginPW);
    if (logintest == "{authenticated: true}") {
      req.session.user = { username: loginName };
      //  sess = req.session.user;
      //  res.cookie("AuthCookie", req.session, false, true);
      res.redirect("/private");
    } else {
      res.render("users/loginpage", { title: "Login Page", hasErrors: true });
    }
  } catch (e) {
    res.render("users/loginpage", { title: "Login Page", hasErrors: true });
  }
});

//SignUp Page GET Route
router.get("/signup", async (req, res) => {
  try {
    res.render("users/signupPage", { title: "Sign Up Page" });
  } catch (e) {
    res.sendStatus(500);
  }
});

//SignUp Page POST Route
router.post("/signup", async (req, res) => {
  const signupName = req.body.username;
  const signupPW = req.body.password1;
  const email = req.body.email;
  const gender = req.body.gender;
  const city = req.body.city;
  try {
    const signuptest = await userdata.addUser(
      signupName,
      signupPW,
      email,
      gender,
      city
    );
    if (signuptest == "{userInserted:true}") {
      res.redirect("/");
    }
  } catch (e) {
    res.status(500).json({ message: "routes error" });
  }
});

//get /private
router.get("/private", async (req, res) => {
  //if (req.session.user) {
  try {
    let userName = req.session.user.username;
    const userPosts = await posts.getPostByPosterName(userName);

    if (!userPosts) {
      res
        .status(500)
        .render("users/userPage", { error: "User has made no posts" });
      return;
    }
    const userActivity = await userdata.getUserByUserName(userName);
    if (!userActivity) {
      res
        .status(500)
        .render("users/userPage", { error: "User has made no posts" });
      return;
    }
    res.render("users/userPage", {
      user: req.session.user,
      userPost: userPosts,
      userActivity: userActivity,
    });
  } catch (e) {
    res.sendStatus(502);
  }
  // }
});

//get /onePost
router.get("/onePost", async (req, res) => {
  if (sess) {
    res.render(200).render({
      itemName: itemName,
      itemDescription: itemDescription,
      itemCategory: itemCategory,
      itemImageURL: itemImageURL,
      latLong: latLong,
    });
  } else {
    res.render("users/listingPage");
  }
});

//get /logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.cookie("AuthCookie", { expires: new Date() });
  res.clearCookie("AuthCookie");
  res.render("users/logoutPage");
});

// let currentLocation = zipcodes.lookup(posts.itemLocation);
// let cityState = currentLocation.city + ", " + currentLocation.state;
// let latLong = currentLocation.latitude + "," + currentLocation.longitude;
// posts.currentLocation = cityState;

//SignUp Page POST Route
router.post("/posting", async (req, res) => {
  let itemName = req.body.title;
  let itemDescription = req.body.description;
  let itemCategory = req.body.item_category;
  let itemImageURL = req.body.item_image;
  let itemLocation = req.body.item_location;

  if (!itemName || !itemDescription || !itemCategory || !itemLocation) {
    res.status(400).render("users/homePage", { error: "Missing Value" });
    return;
  }
  if (
    !itemName.trim().length ||
    !itemDescription.trim().length ||
    !itemCategory.trim().length ||
    !itemLocation.trim().length
  ) {
    res
      .status(400)
      .render("users/homePage", { error: "Value is inputted incorrectly" });
    return;
  }

  try {
    let createPost = await posts.addPost(
      itemName,
      itemDescription,
      itemCategory,
      itemImageURL,
      itemLocation,
      req.session.user.username
    );

    if (!createPost) {
      res
        .status(500)
        .render("users/homePage", { error: "Could not create post" });
      return;
    } else {
      res.redirect("/");
      return;
    }
  } catch (e) {
    res.status(400);
    //.render("users/homePage", { error: "Could not create post" });
    return;
  }
});

//SignUp Page POST Route
router.post("/comments/:id", async (req, res) => {
  let commentText = req.body.comment_form;

  if (!commentText) {
    res.status(400).render("users/homePage", { error: "No comment inputted!" });
    return;
  }
  if (typeof commentText != "string" || !commentText.trim().length) {
    res.status(400).render("users/homePage", { error: "Comment is invalid" });
    return;
  }

  try {
    let createComments = await comments.createComment(
      req.params.id,
      sess.username,
      commentText
    );

    if (!createComments) {
      res.status(500).render("users/homePage", {
        error: "Unable to create comment, please log in.",
      });
      return;
    } else {
      res.redirect("/login");
      return;
    }
  } catch (e) {
    res.status(400).render("users/homePage", {
      error: "unable to create comment, please log in.",
    });
    return;
  }
});

//UpdatePost Page POST Route
router.post("/updatePost/:id", async (req, res) => {
  let availability = req.body.updatepost_form;

  if (!availability) {
    res
      .status(400)
      .render("users/homePage", { error: "Unable to update post." });
    return;
  }
  if (typeof availability != "string" || !availability.trim().length) {
    res
      .status(400)
      .render("users/homePage", { error: "Unable to update post" });
    return;
  }

  try {
    let updatePosts = await posts.updatePost(availability, req.params.id, sess);

    if (!updatePosts) {
      res
        .status(500)
        .render("users/homePage", { error: "Unable to update post." });
      return;
    }

    const getUser = await userdata.getUserByUserName(sess.username);
    const userId = getUser._id;

    let updateUser = await userdata.updateUser(userId, req.params.id);

    if (!updateUser) {
      res
        .status(500)
        .render("users/homePage", { error: "Unable to update post." });
      return;
    } else {
      res.redirect("/login");
      return;
    }
  } catch (e) {
    res
      .status(400)
      .render("users/homePage", { error: "Unable to update post." });
    return;
  }
});

//UpdatePost Page POST Route
router.post("/sortPosts", async (req, res) => {
  let availability = req.body.sortPost;

  if (!availability) {
    res
      .status(400)
      .render("users/homePage", { error: "No Availability Chosen" });
    return;
  }
  if (typeof availability != "string" || !availability.trim().length) {
    res
      .status(400)
      .render("users/homePage", { error: "No Availability Chosen" });
    return;
  }

  try {
    if (availability == "Show All") {
      const sortPosts = await posts.getAllPosts();

      if (!sortPosts) {
        res.status(500).render("users/homePage", { error: "No posts found" });
        return;
      }
      res.render("users/homePage", { posts: sortPosts, sortPosts: sortPosts });
    } else {
      let sortPosts = await posts.sortPost(availability);

      if (sortPosts.length == 0) {
        res.status(500).render("users/homePage", { error: "No posts found" });
        return;
      } else {
        const allPosts = await posts.getAllPosts();
        res.render("users/homePage", {
          posts: sortPosts,
          sortPosts: sortPosts,
        });
        return;
      }
    }
  } catch (e) {
    res.status(400).render("users/homePage", { error: "No posts found" });
    return;
  }
});

// const storage = new GridFsStorage({
//     url: mongoConfig.serverURL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//                 return reject(err);
//             }
//             const filename = buf.toString('hex') + path.extname(file.originalname);
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'uploads'
//             };
//             resolve(fileInfo);
//             });
//         });
//         }
//     });

//const uploads = multer({ storage });

//Posting GET Route
router.get("/posting", async (req, res) => {
  if (sess) {
    let gfs = await uploads();
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render("users/postingPage", { files: false });
      } else {
        files.map((file) => {
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render("users/postingPage", { files: files });
      }
    });
  }
});

// router.post("/upload", upload.single("file"), async (req, res) => {
//   // res.json({ file: req.file });
//   res.redirect("/login");
// });

router.get("/files", async (req, res) => {
  if (req.session.cookie) {
    let gfs = await uploads();
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "No files exist",
        });
      }

      // Files exist
      return res.json(files);
    });
  }
});

router.get("/files/:filename", async (req, res) => {
  if (req.session.cookie) {
    let gfs = await uploads();
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      // File exists
      return res.json(file);
    });
  }
});

router.get("/image/:filename", async (req, res) => {
  if (req.session.cookie) {
    let gfs = await uploads();
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  }
});

module.exports = router;
