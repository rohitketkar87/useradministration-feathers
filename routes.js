
var _ =           require('underscore')
, path =      require('path')    
, mainCtrl = require('./controllers/mainCtrl.js')

var routes = [  
    {
        path:'/api/registeruser',
        httpMethod: 'POST',
        middleware: [mainCtrl.registerUser]
    },
    {
        path:'/api/loginuser',
        httpMethod: 'POST',
        middleware: [mainCtrl.loginUser]
    },
    {
        path:'/api/finduser',
        httpMethod: 'GET',
        middleware: [mainCtrl.findUserByEmail]
    },
    {
        path:'/api/user',
        httpMethod: 'GET',
        middleware: [mainCtrl.findUserById]
    }
     
];

    module.exports = function(app) {
        _.each(routes, function(route) {
            var args = _.flatten([route.path, route.middleware]);
            switch(route.httpMethod.toUpperCase()) {
                case 'GET':
                app.get.apply(app, args);
                break;
                case 'POST':
                app.post.apply(app, args);
                break;
                case 'PUT': 
                app.put.apply(app, args);
                break;
                case 'DELETE':
                app.delete.apply(app, args);
                break;
                default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
            }
        });
    }
