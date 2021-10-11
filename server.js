const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const connectDB = require('./database/db')
connectDB();

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

//routes
app.get("/", function (req, res) {
    res.render('index', { error: '' })
})

const controller = require('./controllers/user_controller')

app.post("/signup", controller.signup)
app.post("/new_store", controller.new_store)
app.post("/login", controller.login)
app.post("/add_product", controller.add_product)
//app.get("/show_all_products", controller.show_all_products)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}`));