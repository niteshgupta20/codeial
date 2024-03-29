const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const dB = require('./config/mongoose');
// used for session cookie.
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');  


const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  name: 'codeial',
  // TODO: change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, function (err) {
  if (err) {
    console.log(`Error is happened in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
})