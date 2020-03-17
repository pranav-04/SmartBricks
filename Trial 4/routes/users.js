const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');
let Property = require('../models/property')
let Verification = require('../models/verification')

// Register Form
router.get('/register', function(req, res){
  res.render('register2');
});

// Register Proccess
router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const mobileno = req.body.mobileno;
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('mobileno', 'Mobile Number is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('mobileno', 'Mobile Number is not valid').isMobilePhone();
  let errors = req.validationErrors();

  if(errors){
    let a = "| "
    for(let index = 0; index < errors.length; index++) {
        a = a + errors[index].msg + ' | '
    }
    console.log(`${a}`)
    res.render('register2', {
      errors:a
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      mobileno:mobileno
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login2');
});

router.get('/my_property', function(req, res){
  Verification.find({},(err,verifications)=>{
    if(err){
      console.log(err)
    }else{
      Property.find({}, (err,properties)=> {
        if(err){
            console.log(err)
        }else{
            res.render('my_properties',{
                title : 'My Properties',
                properties : properties,
                id : req.user._id,
                verifications:verifications
            })
        }
      })
    }
  })

});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
