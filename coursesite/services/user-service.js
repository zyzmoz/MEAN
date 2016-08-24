var User = require('../models/user').User;//remember to add the class
var bcrypt = require('bcrypt-nodejs');

exports.addUser = function(user, next){
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) {
			return next(err);
		};
		//user.password was replaced by hash
		var newUser = new User({
		firstName: user.firstName,
		lastName : user.lastName,
		userName: user.userName,
		password: hash
		});
	
		newUser.save(function(err){
			if (err){
				return next(err);
			}else{
				return next(null);
			};
		});	
		
	});	
	
};

exports.findUser = function(userName, next){	
	User.findOne({userName: userName}, function(err, user){		
		next(err, user);		
	});
};
