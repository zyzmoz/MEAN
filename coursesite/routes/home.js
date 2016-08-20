var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home', {
  	title: 'Dashboard',
  	firstName: req.user ? req.user.firstName : null
  });
});

module.exports = router;