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
    products:
    {
        type: itemSchema
    }
},
    { timestamps: true }
)

const store_model = mongoose.model('store_model', UserSchema)
module.exports = store_model