var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(request, response, next){
	var viewMode = {
		title: "Sign Up"
	};
	response.render('users/create', viewMode);
});

router.post('/create', function(request, response, next){
	userService.addUser(request.body, function(err){
		if(err){
			var vm = {
				title: 'Sign up',
				input: request.body,
				error: 'Error Occurred'
			};
			delete vm.input.password;
			return response.render('user/create', vm);
		};
		
		response.redirect('/home') ;
		
	});	
	
	
});

router.post('/login', passport.authenticate('local'), function(request, response, next){
	response.redirect('/home');
});

router.get('/logout', function(request, response, next){
	request.logout();
	response.redirect('/');
});

module.exports = router;
