const assert = require('assert');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var expect = require('chai').expect;
var app = require('../index.js');
var request = require('supertest');

//valid user
const userCredentials = {
  username: 'meherc', 
  password: 'iou'
}
// unregistered user
const wronguser = {
	username: 'wrong',
	password: 'wrong'
}


describe('User Login', function(done){


	//addresses 1st bullet point: if the user is logged in we should get a 200 status code  
	//Successful login
	
	it('should log in if correct credentials are provided', function(done){
    request("http://localhost:5000")
    .post('/users/login')
    .send(userCredentials)
    .end(function(err, response){
    	// console.log(response)
    	// assert(response.headers.location === '/')
    	User.findOne(userCredentials)
        .then((user) => {
            assert(user.username === 'meherc'); 
            done();
        });
    });
  });
	
	// Login failure
	
	it('should return back to log in page with incorrect credentials', function(done){
    request("http://localhost:5000")
    .post('/users/login')
    .send(wronguser)
    .end(function(err, response){
    	console.log(response.headers)
    	assert(response.headers.location === '/users/login')
		done();
    });
  });
});
