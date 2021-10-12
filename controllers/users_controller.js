const User = require('../models/user');

module.exports.profile = function (req, res) {
  return res.render('profile', {
    "name": "Javascript",
  });
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
    if (err) { console.log('error in finding user in signing up'); }
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
  })
}

//sign in and create a session for user
module.exports.createSession = function (req, res) {
  // TODO Later
}