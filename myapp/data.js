const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productschema = new Schema({
    email :{ type : String,required: true},
    password :{type:String},
    username : {type:String,required: true},
    Image :{type: String}
},
{collection: 'users'}
)

const ProductModel = mongoose.model('testSchema', productschema)
module.exports = ProductModel

