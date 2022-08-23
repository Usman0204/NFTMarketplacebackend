const mongoose = require('mongoose');;
const {Schema} = mongoose;

const schema = new Schema({
    ownerAddress: String,
    collectionID: Number,
    contractAddress: String,
    tokenID: String,
    price: Number,
    time: {type: Date, default: Date.now},
    validTill: Date,
    currency: String
})

const Order = mongoose.model('Order', schema);

module.exports = Order;