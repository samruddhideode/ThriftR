const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    itemID: {
        type: Number
    },
    item_name: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        data: Buffer,
        contentType: String
    }
})
const UserSchema = new Schema({
    name: {
        type: String
    },
    store: {
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
        [product]
},
    { timestamps: true }
)

const store_model = mongoose.model('store_model', UserSchema)
module.exports = store_model;