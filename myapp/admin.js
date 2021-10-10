const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    Idroom :{ type : String},
    Room_number: { type : String},
    date: {type : String},
    time : {type : String},
    label: {type : String},
   
},
{collection: 'model'}
)

const adminModel = mongoose.model('model', product)
module.exports = adminModel

