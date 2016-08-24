//funtion to configura passport

module.exports = function(){
	var passport = require('passport');
	var passportLocal = require('passport-local');
	var userService = require('../services/user-service');
	var bcrypt = require('bcrypt-nodejs');
	
	//pass new instance of the passport local strategy which takes a function to verify password
	passport.use(new passportLocal.Strategy({usernameField: 'userName'},function(userName, password, next){
		
		userService.findUser(userName, function(err, user){			
			if (err){
				
				return next(err);
			};
			
			if (user == null ){				
				return next(null, null); //when user doesnt exists
			};
			//either username or passwort is incorrect
			bcrypt.compare(password, user.password, function(err, same){
				if (err){
					return next(err);
				};
				
				if (!same){
					return next(null, null);
				};
				next(null, user);// when no error and username and password is trusted			
								
			});		
			
						
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
