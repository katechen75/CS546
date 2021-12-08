const express = require('express');
const router = express.Router();
const userdata = require('../data/users')

router.get('/', async (req, res) => {
    try {
        res.render('pages/signup', { title: "Sign Up Page" });
      } catch (e) {
        res.sendStatus(500);
      }
    });


router.post('/', async (req, res) => {
        const signupName = req.body.username;
        const signupPW = req.body.password;
        const email = req.body.email;
        const gender = req.body.genderSelect;
        const city = req.body.city;
        const NYcities = [];
        const NJcities = [];
  try {     
     // res.status(400).render('pages/signup',{ title: "Sign Up Page" , hasErrors: true,errors:errors})   
      const signuptest = await userdata.addUser(signupName,signupPW,email,gender,city)
          if(signuptest=='{userInserted:true}'){
          res.redirect('/');
         }
        }
    catch(e) {
        res.status(500).json({ message: 'routes error' });
    }
      });

module.exports = router;
