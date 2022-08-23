const mongoose = require('mongoose');;
const {Schema} = mongoose;

const schema = new Schema({
    creator: String,
    name: String,
    description: String,
    image: String,
    websiteLink: String,
    totalSupply: {type : Number, default: 0},
    decimals: {type: Number, default: 1},
    symbol: String,
    contractAddress: {type: String, unique: true},
    tokenStandard: {type: String, default: 'ERC721'},
    blockchain: {type: String, default: 'BSC'},
    totalSale: {type: Number, default: 0},
    publicUrl: String
})


const Collection = mongoose.model('Collection', schema);

module.exports = Collection;