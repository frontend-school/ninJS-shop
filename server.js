var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./server/configuration/config'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    productController = require('./server/controller/product');


mongoose.connect(config.ninjs_mongo_uri);

// Create our Express application
var app = express();

// Body parser for only JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create our Express router
var router = express.Router();
// Register all our routes
app.use(router);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/dist'));

//add cors to do the cross site requests
app.use(cors());
// Create endpoint handlers for /products
router.route('/api/products')
    .post(productController.postProducts)
    .get(productController.getProducts);

app.get('/', function(req, res) {

    res.render('index.html');
    //res.render('pages/index');
});
// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log(port + ' is listening port');