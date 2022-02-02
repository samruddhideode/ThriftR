//dependancies
require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectDB = require('./database/db')
const Grid = require('gridfs-stream')
const path = require('path')
const fs = require('fs')

//-----for image storage--------------------
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });
//-------------------------------------------

//function to connect to mongodb database
connectDB();
//---------------------------------------------

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')


//routes
app.get("/", function (req, res) {
    res.render('index', { error: '' })
})

const controller = require('./controllers/user_controller')
//var imgModel = require('./models/image_model');
const store_model = require('./models/store_model')

app.post("/signup", controller.signup)
app.post("/new_store", controller.new_store)
app.post("/login", controller.login)
app.post("/store_login", controller.store_login)

//add product function description is given here
app.post("/add_product", upload.single('image'), (req, res, next) => {

    var objProduct = {
        item_name: req.body.item_name,
        description: req.body.description,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    store_model.updateOne({ name: req.body.username }, { $push: { products: objProduct } }, (err, store) => {
        console.log(store)
        if (err) {
            console.log(err);
        }
        else {
            store_model.find({ name: req.body.username }, function (error, storeobj) {
                if (error) {
                    res.render('index', {
                        error: 'Wrong Credentials'
                    })
                } else {
                    console.log('in server.js: ', storeobj);
                    res.render('listProducts', {
                        newStore: storeobj[0],
                        error: ''
                    })
                }
            });
        }
    });
});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}`));

app.use('/static', express.static('public'));

//npm install gridfs-stream dotenv multer