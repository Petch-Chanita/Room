const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    datetime :{ type : String},
    temperature:{ type : Number},
    motion:{ type : Number},
    luminance: { type : Number},
    label:{ type : String}
   
},
{collection: 'static'}
)

const staticModel = mongoose.model('static', product)
module.exports =staticModel

