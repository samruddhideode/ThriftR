const customer = require('../models/customer_model');
const store = require('../models/store_model');

const signup = (req, res) => { //add validations for email address and phone number
    try {
        let cust = new customer({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        console.log(cust)
        cust.save()
        res.render('browseProducts', {
            cust
        })
    }
    finally {
        //console.log(cust)
        console.log(req.body);
    }
}

const new_store = (req, res) => {
    try {
        let newStore = new store({
            name: req.body.name,
            store: req.body.store,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        newStore.save()
        console.log(newStore.store);
        res.render('listProducts', {
            newStore,  //logged in user data
            error: ''
        })
    }
    finally {
        console.log(req.body);
    }
}

const login = (req, res, next) => {
    var username = req.body.name
    var password = req.body.password
    customer.find({ name: username }, function (err, cust) {
        if (err) {
            res.render('error')
        }
        else {
            if (!cust.length) {
                res.render('index', {
                    error: 'Wrong credentials'
                })
            }
            else {
                if (cust[0].password == password) {
                    res.render('browseProducts', {
                        cust: cust[0]
                    })
                    console.log(cust);
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

const add_product = (req, res, next) => {
    var objProduct = {
        itemID: req.body.prod_id,
        item_name: req.body.name,
        description: req.body.description
    };
    store.findOneAndUpdate({ name: req.body.username }, { $push: { products: objProduct } }, { new: true }, function (err, storeobj) {
        if (err) {
            res.render('index', {
                error: 'Wrong Credentials'
            })
        } else {
            console.log(storeobj);
            res.render('listProducts', {
                newStore: storeobj,
                error: ''
            })
        }
    });
    // store.find({ name: req.body.username }, function (err, storeobj) {
    //     console.log(storeobj)
    //     res.json(
    //         {
    //             message: storeobj
    //         }
    //     )
    // })
    console.log()
}


module.exports = {
    signup, login, new_store, add_product
}
