const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    creatorAddress: String,
    contractAddress: String,
    tokenID: String,
    walletAddress: String,
    nftName: String,
    description: String,
    imageUrl: String,
    royalties: String,
    category: String,
    attributes: [{ trait_type: String, value: String }],
    likedBy: [{address: String}],
    numerOfLikes: {type: Number, min: 0, default: 0},
    likedImage: {type: String, default: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart.png"},
    unLikedImage: {type: String, default: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart-outline-icon.png"}
});

const Token = mongoose.model("Token", schema);
module.exports = Token;