const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    Idroom :{ type : String},
    Room_number: { type : String},
    status: {type : String},
    temperature:{ type : Number},
    motion:{ type : Number},
    luminance: { type : Number},
    people: { type : Number}
},
{collection: 'numroom'}
)

const roomModel = mongoose.model('numroom', product)
module.exports = roomModel

