var contextPath = process.cwd();
var userService = require(contextPath +'/services/userservice.js');

module.exports = {
	/**
	 * [registerUser description]
	 * @param  {[type]}   req      [description]
	 * @param  {[type]}   res      [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	registerUser: function(req, res) {
		console.log('mainCtrl : registerUser starts');
		var userInput = req.body;
		console.log('****req.body***** '+JSON.stringify(req.body, null, 4));
		userService.registerUser(userInput, function(result) {
			if (result.status == '400') {
				console.log('Error while registering user');
			} 
			res.send(result);
		});
	},	// End of registerUser

	/**
	 * [loginUser description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	loginUser: function(req, res) {
		console.log('mainCtrl : loginUser starts');
		var userInput = req.body;
		userService.loginUser(userInput, function(result) {
			if (result.status == '400') {
				console.log('Error while login user');
			} 
			res.send(result);
		})
	},	// End of loginUser

	findUserByEmail: function(req, res) {
		console.log('mainCtrl : findUserByEmail starts');
		var email = req.param('email');
		userService.findUserByEmail(email, function(result) {
			if (result.status == '400') {
				console.log('Error while retrieving user');
			} 
			res.send(result);
		})
	},	// End of findUserByEmail

	findUserById: function(req, res) {
		console.log('mainCtrl : findUserById starts');
		var id = req.param('id');
		userService.findUserById(id, function(result) {
			if (result.status == '400') {
				console.log('Error while retrieving user');
			} 
			res.send(result);
		})
	}	// End of findUserById
}