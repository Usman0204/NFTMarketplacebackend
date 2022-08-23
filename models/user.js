const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    walletAddress: {type: String, unique: true},
    bio: String,
    displayName: String,
    email: String,
    facebookUserName: String,
    instagramUserName: String,
    ipfsImageUrl: {type:String, default: 'https://www.pngitem.com/pimgs/m/226-2267516_male-shadow-circle-default-profile-image-round-hd.png'},
    telegramChannel: String,
    twitterUserName: String,
    coverPicture: String,
    followers: [{ address: {type: String} }],
    following: [{ address: {type: String} } ],
    followersCount: {type: Number, min: 0, default: 0},
    followingCount: {type: Number, min: 0, default: 0},
    likedTokens: [{ contractAddress: {type: String}, tokenID: {type: String} }],
    numberOfLikedTokens: {type: Number, min: 0, default: 0},
    likedImage: {type: String, default: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart.png"},
    unLikedImage: {type: String, default: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart-outline-icon.png"}
})

const User = mongoose.model('User', schema);

module.exports = User;