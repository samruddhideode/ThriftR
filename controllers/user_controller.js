const customer = require('../models/customer_model');
const store = require('../models/store_model');

const signup = (req, res) => { //add validations for email address and phone number
    try {
        let cust = new customer({
            name: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        cust.save()
        console.log('cust: ', cust);
        store.find({}, function (error, store_list) {
            if (error) {
                res.render('error')
            }
            else {
                console.log(store_list[0])
                res.render('browseProducts', {
                    cust,
                    store_list
                })
            }
        });
    }
    finally {
        //console.log(cust)
        console.log('hi')
    }
}
const new_store = (req, res) => {
    try {
        let newStore = new store({
            name: req.body.username,
            store: req.body.store,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        })
        newStore.save();
        console.log(req.body.username, req.body.store);
        console.log(newStore);
        res.render('listProducts', {
            newStore,  //logged in user data
            error: '',
        })
    }
    finally {
        console.log(req.body);
    }
}

const login = (req, res) => {
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
                    //try to put this code in a separate function
                    store.find({}, function (error, store_list) {
                        if (error) {
                            res.render('error')
                        }
                        else {
                            // var list = JSON.stringify(store_list)
                            // list = JSON.parse(list)
                            console.log(store_list[0])
                            res.render('browseProducts', {
                                cust: cust[0],
                                store_list
                            })
                        }
                    });
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

const store_login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    store.find({ name: username }, function (err, storeobj) {
        if (err) {
            res.render('error')
        }
        else {
            if (!storeobj.length) {
                res.render('index', {
                    error: 'Wrong credentials'
                })
            }
            else {
                if (storeobj[0].password == password) {
                    //try to put this code in a separate function
                    store.find({ name: req.body.username }, function (error, newStore) {
                        if (error) {
                            res.render('index', {
                                error: 'Wrong Credentials'
                            })
                        } else {
                            // res.json({
                            //     message: 'logged in',
                            //     message1: 'newStore[0].name'
                            // })
                            res.render('listProducts', {
                                newStore: newStore[0],
                                error: ''
                            })
                        }
                    });
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
    signup, login, new_store, store_login
}
