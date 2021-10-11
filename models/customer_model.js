const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        [{
            itemID: Number,
            item_name: String,
            Type: String
        }]
},
    { timestamps: true }
)

const customer_model = mongoose.model('customer_model', UserSchema)
module.exports = customer_model;