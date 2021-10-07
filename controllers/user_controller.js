const customer = require('../models/customer_model');
const store = require('../models/store_model');

const signup = (req, res) => {
    try {
        let cust = new customer({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        cust.save()
        res.render('browseProducts')
    }
    finally {
        console.log(req.body);
    }
}

const new_store = (req, res) => {
    try {
        let newStore = new store({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        newStore.save()
        res.render('listProducts', {
            customer: customer[0],   //logged in user data
        })
    }
    finally {
        console.log(req.body);
    }
}

const login = (req, res, next) => {
    var username = req.body.name
    var password = req.body.password
    customer.find({ name: username }, function (err, user) {
        if (err) {
            res.render('error')
        }
        else {
            if (!user.length) {
                res.render('index', {
                    error: 'Wrong credentials'
                })
            }
            else {
                if (user[0].password == password) {
                    res.render('browseProducts')
                }
                else {
                    res.render('index', {
                        error: 'Wrong Credentials'
                    })
                }
            }
        }
    })
}

module.exports = {
    signup, login, new_store
}