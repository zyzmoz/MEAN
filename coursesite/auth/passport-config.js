//funtion to configura passport

module.exports = function(){
	var passport = require('passport');
	var passportLocal = require('passport-local');
	var userService = require('../services/user-service');
	
	//pass new instance of the passport local strategy which takes a function to verify password
	passport.use(new passportLocal.Strategy({usernameField: 'userName'},function(userName, password, next){
		
		userService.findUser(userName, function(err, user){			
			if (err){
				
				return next(err);
			};
			
			if ((user == null) || user.password !== password){				
				return next(null, null); //when user or password is incorrect
			};
			next(null, user);//no error and is a valid user
		});
	}));
	passport.serializeUser(function(user, next){
		next(null, user.userName);
	});
	
	passport.deserializeUser(function(userName, next){
		userService.findUser(userName, function(err, data){
			next(err,data);
		});
	});
	
};
