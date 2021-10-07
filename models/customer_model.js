const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    itemID: {
        type: Number
    },
    name: {
        type: String
    },
    Type: {
        type: String
    }
})

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    cart:
    {
        type: itemSchema
    }
},
    { timestamps: true }
)

const customer_model = mongoose.model('customer_model', UserSchema)
module.exports = customer_model;