var contextPath = process.cwd();
var mongoose = require('mongoose');
var mongooseService = require('feathers-mongoose');
var users = require(contextPath +'/models/users.js');
var express = require('express');
var feathers = require('feathers');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var memory = require('feathers-memory');
var bodyParser = require('body-parser');
var authentication = require('feathers-authentication');
//var socketio = require('feathers-socketio');

//var subapp = express();
var app = feathers()
  .configure(rest())
  .configure(hooks())
  //.configure(socketio())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/users', mongooseService({Model: users}))
  .configure(authentication({
    userEndpoint: '/users',
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    idField: 'id'
  }))

var router = feathers.Router();
router.use(function(req, res, next) {
    next();
});

app.use('/api', router);
require('./routes.js') (app);

//Connect to mongodb instance
mongoose.connect('mongodb://localhost:27017/feathers');

app.listen(3030, function() {
    console.log('Feathers demo app started on 127.0.0.1:3030');
});


