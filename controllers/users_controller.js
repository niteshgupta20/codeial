const User = require('../models/user');

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) { console.log('Error in fetching user from Db'); return; }
      if (user) {
        return res.render('user_profile', {
          title: "User Profile",
          user: user
        });
      } else {
        return res.redirect('/users/sign-in');
      }
    });
  } else {
    return res.redirect('/users/sign-in');
  }
}

module.exports.signUp = function (req, res) {
  return res.render('user_sign_up', {
    title: "Codial | Sign Up"
  });
}

module.exports.signIn = function (req, res) {
  return res.render('user_sign_in', {
    title: "Codial | Sign In"
  });
}

//get the signup data
module.exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { console.log('error in finding user in signing up'); return; }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('Error in creating User in signing Up');
          return;
        }
        return res.redirect('/users/sign-in');
      })
    } else {
      return res.redirect('back');
    }
  });
}

//sign in and create a session for user
module.exports.createSession = function (req, res) {

  // Steps to authenticate
  // find the user
  // handle user found
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { console.log('error in finding user in signing up'); return; }
    //console.log(user);
    if (user) {
      // handle password which don't match
      if (user.password != req.body.password) {
        return res.redirect('back');
      }
      // handle session creation
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
      
    } else {
      // handle user not found
      return res.redirect('back');
    }
  });
}

module.exports.signOut = function (req, res) {
  res.clearCookie('user_id', null);
  return res.redirect('/users/sign-in');
}