var User = require('../models/user').User;//remember to add the class

exports.addUser = function(user, next){
	console.log(User);
	var newUser = new User({
		firstName: user.firstName,
		lastName : user.lastName,
		userName: user.userName,
		password: user.password
	});
	
	newUser.save(function(err){
		if (err){
			return next(err);
		}else{
			return next(null);
		};
	});	
};

exports.findUser = function(userName, next){	
	User.findOne({userName: userName}, function(err, user){		
		next(err, user);		
	});
};
