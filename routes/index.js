const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/home_controllers');

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


router.get('/', home_controller.home);
router.use('/users', require('./users'));







module.exports = router;