module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 101);
  return res.render('index', {
    "title": "Home",
  });
}
