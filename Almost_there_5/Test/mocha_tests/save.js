const assert = require('assert');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

describe('save user to database', function(){

	it('saved to database', function(done){
		var user = new User({
			name:"Meher",
		  	email:"kopema5943@itiomail.com",
		  	username:"meherc",
			password:"iou",
			mobileno:"1234567890"
		});

		user.save().then(function(){
			assert(user.isNew === false);
			console.log("successfully saved to the database")
			done();
		});


	});

}); 