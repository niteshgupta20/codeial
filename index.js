const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const dB = require('./config/mongoose');

const app = express();

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//use express router
app.use('/', require('./routes'));



app.listen(port, function (err) {
  if (err) {
    console.log(`Error is happened in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
})