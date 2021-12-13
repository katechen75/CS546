const express = require("express");
const router = express.Router();
const userdata = require("../data/users");

router.get("/", async (req, res) => {
  try {
    res.render("users/signupPage", { title: "Sign Up Page" });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const signupName = req.body.username;
  const signupPW = req.body.password1;
  const email = req.body.email;
  const city = req.body.city;
  let gender = "Unknown";
  if (!req.body.gender) {
    gender = "Unknown";
  } else {
    gender = req.body.gender;
  }
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
    res.render("users/signupPage", { title: "Sign Up Page", hasErrors: true });
  }
});

module.exports = router;
