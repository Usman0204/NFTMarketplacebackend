const User = require('../models/user')


exports.addUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        return res.status(200).json({status: true, data: newUser})

    } catch (error) {
        // console.log('error::::', error)
        return res.status(500).json({status: false, msg : error.message, body: req.body})
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne(req.body)
        res.status(200).json({status: true, data: user})
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
    
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json({ status: true, data: users })
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.deleteOne(req.body)
        return res.status(200).json({status: true, data: user})
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.editUser = async (req, res, next) => {
    try {
        const user = req.body.walletAddress
        const update = req.body

        const updated = await User.findOneAndUpdate({walletAddress: user}, {
            displayName: req.body.displayName,
            bio: req.body.bio,
            twitterUserName: req.body.twitterUserName,
            instagramUserName: req.body.instagramUserName,
            facebookUserName: req.body.facebookUserName,
            telegramChannel: req.body.telegramChannel,
            email: req.body.email,
            ipfsImageUrl: req.body.ipfsImageUrl
        });

        return res.status(200).json({ status: true, data: {user, updated} })
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.alreadyExists = async (req, res, next) => {
    try {
        const user = await User.find(req.body)
        return res.status(200).json({status: true, data: user})
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})        
    }

}

exports.addFollower = async (req, res, next) => {
    try {
        const follower = req.body.walletAddress;
        const toFollow = req.body.toFollow;

        if (!follower && !toFollow ){
            return res.status(500).json ({status: false, msg : "required parameters not present"})
        }

        if (follower == toFollow){
            return res.status(500).json({status: false, msg : "follow and toFollow cannot be same"})
        }

        const followerResult = await User.findOneAndUpdate({walletAddress: follower}, { $push : { following: {address: toFollow} } }, {new: true})
        const toFollowResult = await User.findOneAndUpdate({walletAddress: toFollow}, { $push : { followers: {address: follower} } }, {new: true})
        const followingCount = await User.findOneAndUpdate({walletAddress: follower}, { $inc: {followingCount: 1} }, {new: true})
        const followersCount = await User.findOneAndUpdate({walletAddress: toFollow}, { $inc: {followersCount: 1} }, {new: true})
        
        return res.status(200).json({status: true, data: {followerResult, toFollowResult, followersCount, followingCount, follow: true} })

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})        
    }
}

exports.removeFollower = async (req ,res, next) => {
    try {
        const follower = req.body.walletAddress;
        const toFollow = req.body.toFollow;

        if (!follower && !toFollow ){
            return res.status(500).json ({status: false, msg : "required parameters not present"})
        }

        if (follower == toFollow){
            return res.status(500).json({status: false, msg : "follow and toFollow cannot be same"})
        }

        const followerResult = await User.findOneAndUpdate({walletAddress: follower}, { $pull : { following: { address: toFollow } } }, {new: true})
        const toFollowResult = await User.findOneAndUpdate({walletAddress: toFollow}, { $pull : { followers: { address: follower } } }, {new: true})
        const followingCount = await User.findOneAndUpdate({walletAddress: follower}, { $inc: {followingCount: -1} }, {new: true})
        const followersCount = await User.findOneAndUpdate({walletAddress: toFollow}, { $inc: {followersCount: -1} }, {new: true})

        return res.status(200).json({status: true, data: {followerResult, toFollowResult, followersCount, followingCount, follow: false} })
    } catch (error) {
        console.log(error)    
        return res.status(500).json({status: false, msg : error.message})    
    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const followers = await User.find({walletAddress: address});
        return res.status(200).json({ status: true, data: followers.followers});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})     
    }
}

exports.getFollowersAndDetails = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const account = req.body.account;

        const followers = await User.find({walletAddress: address});
        const connectedAccount = await User.findOne({walletAddress: account})
        const detailsOfFollowers = [];
        const array = followers[0].followers;

        try {
            for (const element of array) {
                await User.findOne({walletAddress: element.address}).then( (data) => {
                    detailsOfFollowers.push(data);
                })
            }

        } catch (error) {
            console.log(error)
        }

        // console.log(detailsOfFollowers);
        return res.status(200).json({ status: true, data: {connectedAccount, detailsOfFollowers}})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getFollowing = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const following = await User.find({walletAddress: address});
        return res.status(200).json({status: true, data: following.following});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getFollowingAndDetails = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const account = req.body.account;

        const followings = await User.find({walletAddress: address});
        const connectedAccount = await User.findOne({walletAddress: account})
        const detailsOfFollowing = [];
        const array = followings[0].following;

        try {
            for (const element of array) {
                await User.findOne({walletAddress: element.address}).then( (data) => {
                    detailsOfFollowing.push(data);
                })
            }
        } catch (error) {
            console.log(error)
        }

        // console.log(detailsOfFollowing);
        return res.status(200).json({ status: true, data: {connectedAccount, detailsOfFollowing}})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getNumberOfFollowers = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;

        const result = await User.find({walletAddress: address});
        const number = result.followersCount;

        return res.status(200).json({status: true, data: number});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getNumberOfFollowing = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;

        const result = await User.find({walletAddress: address});
        const number = result.followingCount;

        return res.status(200).json({status: true, data: number});
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAlreadyFollowing = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const toCheck = req.body.toFollow;

        const result = await User.findOne( {walletAddress: address , following : { $elemMatch: {address: toCheck } }} )

        // console.log(result)

        if (!result){
            return res.status(200).json({status: true, data: false});
        }
        
        return res.status(200).json({status: true, data: true})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAlreadyFollowed = async (req, res, next) => {
    try {
        const address = req.body.walletAddress;
        const toCheck = req.body.toFollow

        const result = await User.find({walletAddress: address , followers : { $elemMatch: {address: toCheck} }} )

        if (result.length <= 0){
            return res.status(200).json({status: true, data: false});
        }

        return res.status(200).json({status: true, data: true})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}
