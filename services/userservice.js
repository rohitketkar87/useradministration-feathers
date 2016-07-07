
/*var contextPath = process.cwd();
var users = require(contextPath +'/models/users.js');
var feathers = require('feathers');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var bodyParser = require('body-parser');
var mongooseService = require('feathers-mongoose');
var authentication = require('feathers-authentication');
var authentication_client = require('feathers-authentication/client');*/
var app = require('../app.js').app;
var authentication = require('../app.js').authentication;
/*var socketio = require('feathers-socketio')
var io = require('socket.io');
const host = 'http://localhost:3030';
var socket = io(host);*/
//var localStorage = require('localstorage-memory');

// Initialize the application
/*var app = feathers()
.configure(rest())
//.configure(socketio(socket))
.configure(hooks())
.use('/users', mongooseService({Model: users}))
.configure(authentication)*/
/*.configure(authentication({
	userEndpoint: '/users',
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    idField: '_id'
}))*/
//app.configure(authentication_client())

// create and register a users service
//app.use('/users', mongooseService({Model: users}));
var userService = app.service('users');

module.exports = {
	/**
	 * [registerUser description]
	 * @param  {[type]}   userInput [description]
	 * @param  {Function} callback  [description]
	 * @return {[type]}             [description]
	 */
	registerUser: function(userInput, callback) {
	 	console.log('userservice : registerUser starts');
	 	console.log('****userInput***** '+JSON.stringify(userInput, null, 4));
	 	var result = {
	 		msg : '',
	 		status : '',
	 		id : ''
	 	};
	 	/*userService.before({
	 		create: [authentication.hooks.hashPassword(), function(hook) {
	 			console.log('****hook**** '+JSON.stringify(hook, null, 4));
	 			hook.data.createdAt = new Date();
	 		}]
	 	});*/
	 	userService.create(userInput, function(err, output) {
	 		if (err) {
	 			console.log('Error while registering user');
	 			result.status = '400';
	 			result.msg = 'Error while registering user';
	 		} else {
	 			console.log('User created '+JSON.stringify(output, null, 4));	
	 			result.status = '200';
	 			result.msg = 'User registered successfully';
	 			result.id = output.id;
			}	// End of if-else
			callback(result);
		});
	},	// End of registerUser

	/**
	 * [loginUser description]
	 * @param  {[type]}   userInput [description]
	 * @param  {Function} callback  [description]
	 * @return {[type]}             [description]
	 */
	/*loginUser: function(userInput, callback) {
	 	console.log('userservice : registerUser starts');
	 	console.log('****userInput***** '+JSON.stringify(userInput, null, 4));
	 	var result = {
	 		msg : '',
	 		status : '',
	 		id : ''
	 	};
	 	app.authenticate({
	 		type: 'local',
	 		'email': userInput.email,
	 		'password': userInput.password
	 	}, function(err, result) {
	 		console.log('Authenticated!!');
	 	});*/
	 	/*, function(err, output) {
	 		console.log('****output*** '+JSON.stringify(output, null, 4));
	 		if (err) {
	 			result.status = '400';
	 			result.msg = 'Error while login'
	 		} else {
	 			result.status = '200';
	 			result.msg = 'Logged in successfully';	
	 		}
	 		callback(result);
	 	});*/
	 	
	 	/*userService.create(userInput, function(err, output) {
	 		if (err) {
	 			console.log('Error while registering user');
	 			result.status = '400';
	 			result.msg = 'Error while registering user';
	 		} else {
	 			console.log('User created '+result);	
	 			result.status = '200';
	 			result.msg = 'User registered successfully';
	 			result.id = output.id;
			}	// End of if-else
			callback(result);
		});*/
	//},	// End of loginUser

	findUserByEmail: function(email, callback) {
	 	console.log('userservice : findUserByEmail starts');
	 	console.log('****Email***** '+email);
	 	var result = {
	 		msg : '',
	 		status : '',
	 		userRecord : []
	 	};

	 	userService.after({
	 		find: hooks.remove('password', function(hook) {
	 			console.log("****hook.params****" +JSON.stringify(hook.params, null, 4));
	 		})
	 	});
	 	
	 	/*Using callback*/
	 	userService.find({query: {email: email}, provider: "vast"}, function(err, output) {
	 		if (err) {
	 			console.log(err);
	 			result.status = '400';
	 			result.msg = 'err';
	 		} else {
	 			console.log('User retrieved '+JSON.stringify(output, null, 4));	
	 			result.status = '200';
	 			result.msg = 'User retrieved successfully';
	 			result.userRecord = output;
			}	// End of if-else
			callback(result);
		});

		/*Using promise*/
		/*userService.find({query: {email: email}}).then(function(output) {
			console.log('User retrieved '+JSON.stringify(output, null, 4));	
			result.status = '200';
			result.msg = 'User retrieved successfully';
			result.userRecord = output;
			callback(result);
		});*/
	},	// End of findUserByEmail

	findUserById: function(id, callback) {
	 	console.log('userservice : findUserById starts');
	 	console.log('****Id***** '+id);
	 	var result = {
	 		msg : '',
	 		status : '',
	 		userRecord : {}
	 	};

	 	userService.after({
	 		 /*get: hooks.remove('password')*/
	 		get(hook) {
	 			console.log('******hook*****'+JSON.stringify(hook, null, 4));
	 			hook.result.password = 'Are you kidding me!!';
	 		}
	 	});
	 	userService.get(id, function(err, output) {
	 		if (err) {
	 			console.log('Error while retrieving user');
	 			result.status = '400';
	 			result.msg = 'Error while retrieving user';
	 		} else {
	 			console.log('User retrieved '+JSON.stringify(output, null, 4));	
	 			result.status = '200';
	 			result.msg = 'User retrieved successfully';
	 			result.userRecord = output;
			}	// End of if-else
			callback(result);
		});
	}	// End of findUserById


}
