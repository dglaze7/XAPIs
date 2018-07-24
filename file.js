const restify = require('restify');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const server = restify.createServer({
    name: 'X Kitchen web API',
    version: '1.0.0'
});

server.use(bodyParser.json());

server.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS, PUT");
    next();
});


server.get('/', (req, res, next) => {
    var html = "<html><body><h2>X Kitchen API Web Service </h2> <h1> XkitchenAPI</h1></body></html>";
    res.writeHead(200, {
        'Content-Lenght': Buffer.byteLength(html),
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
});

// //jwt

// server.get('/api', (req, res, next) => {
//      res.json({
//         message: 'Welcome'
//      });
//  });

//  server.post('/api/posts', verifyToken, (req, res, next) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             return next(new Error(err));
//         }else{
//             res.json({
//                 message: 'Post Created',
//                 authData
//              });
//         }
//     });
// });

// server.get('/api/posts', verifyToken, (req, res, next) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             return next(new Error(err));
//         }else{
//             res.json({
//                 message: 'Post Created',
//                 authData
//              });
//         }
//     });
// });

// server.post('/api/login', (req, res, next) => {
//     const user = {
//         id: 2,
//         username: 'ramadhoniss',
//         email: 'rama_doni17@ymail.com',
//         phone : '0812131231231'

//     }
//     jwt.sign({user}, 'secretkey', (err, token) => {
//         res.json({
//             token
//         });
//     });
// });

// /*
//  * Format Of Token
//  * Authorization: Bearer <access_token>
//  * Verify Tokens
//  */
// function verifyToken(req, res, next){
   
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if  (typeof bearerHeader !== 'undefined'){
//         // Split at the space
//         const bearer = bearerHeader.split(' ');
//         // Get token from array
//         const bearerToken = bearer[1];
//         // set the token
//         req.token = bearerToken;
//         // Next middleware
//         next();

//     }else{
//         // Forbidden
//         res.json({
//             message: 'forbidden'
//         });
//     }
// }

//Route


require('./components/controllers/template.controller')(server, 'tests');
require('./components/controllers/users.controller')(server, 'users');
require('./components/controllers/product.controller')(server, 'products');
require('./components/controllers/category.controller')(server, 'categories');


global.config = require('./components/configurations/config');

//connect to database
mongoose.connect(config.dbconn);


server.listen(config.port,function () {
    console.log('%s listen at %s', server.name, server.url);
});