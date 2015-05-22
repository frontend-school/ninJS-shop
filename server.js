var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cors = require('cors'),
    session = require('express-session'),
    CONFIG = require('./server/configuration/secret_config'),
    productController = require('./server/controller/product'),
    authController = require('./server/controller/auth'),
    userController = require('./server/controller/customer');

// Connect to remote mongo db
mongoose.connect(CONFIG.DB_REMOTE.DB_NINJS_MONGO_URI);

// Create our Express application
var app = express();

// Body parser for only JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create our Express router
var router = express.Router();

// Set view file to render a file
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/dist'));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

//add cors to do the cross site requests
app.use(cors());


// Register all our routes
app.use(router);

// Create endpoint handlers for /products
router.route('/api/products')
    .post(productController.postProducts)
    .get(productController.getProducts);

//
app.get('/', function(req, res) {

    res.render('index.html');
});
router.route('/api/login')
    .post(userController.apiLogin);
router.route('/api/signup')
    .post(userController.apiSignup);

router.route('/api/me')
    .get(userController.ensureAuthorized, function(req, res) {
        res.json({
            data: "OK"
        });
        /*    User.findOne({token: req.token}, function(err, user) {
         if (err) {
         res.json({
         type: false,
         data: "Error occured: " + err
         });
         } else {
         res.json({
         type: true,
         data: user
         });
         }
         });*/
    });


// route for facebook authentication and login
app.get('/auth/facebook', authController.isFBAuthenticated);

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' },function(err, cust){
        //res.json({cust});
        var customer = cust;
    }),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        var u = req.user;
        res.redirect('/users/' + req.user.username);
    });


// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log(port + ' is listening port');