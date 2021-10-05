const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect( // make sure special chars in password are encoded: '@' : '%40'
            'mongodb+srv://ThriftR_user:%40Drcooper123@cluster0.1f3lj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('Database connection established');
    } catch (err) {
        console.log(err);
    }
}


module.exports = connectDB;