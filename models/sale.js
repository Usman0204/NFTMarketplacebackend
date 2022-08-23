const mongoose = require('mongoose');;
const {Schema} = mongoose;

const schema = new Schema({
    buyerAddress: String,
    sellerAddress: String,
    collectionID: Number,
    contractAddress: String,
    tokenID: Number,
    price: String,
    royalties: String,
    time: {type: Date, default: Date.now}

})

const Sale = mongoose.model('Sale', schema);

module.exports = Sale;