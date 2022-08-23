const mongoose = require('mongoose');;
const {Schema} = mongoose;

const schema = new Schema({
    bidderAddress: String,
    collectionID: Number,
    contractAddress: String,
    tokenID: String,
    amount: Number,
    time: {type: Date, default: Date.now},
    validTill: Date
})

const Bid = mongoose.model('Bid', schema);

module.exports = Bid;