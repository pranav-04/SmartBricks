const assert = require('assert');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


describe('Reading user details', () => {
    it('finds user with the name of Meher', (done) => {
        User.findOne({
			name:"Meher",
		  	email:"kopema5943@itiomail.com",
		  	username:"meherc",
			password:"iou",
			mobileno:"1234567890"
		})
        .then((user) => {
            assert(user.username === 'meherc'); 
            done();
        });
    })
})