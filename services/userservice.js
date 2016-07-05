
var contextPath = process.cwd();
var users = require(contextPath +'/models/users.js');
var feathers = require('feathers');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var bodyParser = require('body-parser');
var mongooseService = require('feathers-mongoose');
var authentication = require('feathers-authentication');
var authentication_client = require('feathers-authentication/client');
/*var socketio = require('feathers-socketio')
var io = require('socket.io-client');
const host = 'http://localhost:3030';
var socket = io(host);*/
//var localStorage = require('localstorage-memory');

// Initialize the application
var app = feathers()
.configure(rest())
//.configure(socketio(socket))
.configure(hooks())
.use('/users', mongooseService({Model: users}))
.configure(authentication({
	userEndpoint: '/users',
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    idField: '_id'
}))
.configure(authentication_client())

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

	 	userService.before({
	 		create: authentication.hooks.hashPassword('password')
	 	});
	 	userService.create(userInput, function(err, output) {
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
		});
	},	// End of registerUser

	/**
	 * [loginUser description]
	 * @param  {[type]}   userInput [description]
	 * @param  {Function} callback  [description]
	 * @return {[type]}             [description]
	 */
	loginUser: function(userInput, callback) {
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
	 	});
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
	}	// End of loginUser

}
