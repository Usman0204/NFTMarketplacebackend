const Token = require('../models/token');
const Collection = require('../models/collection');
const Order = require('../models/order');
const User = require('../models/user')

exports.addToken = async (req, res, next) => {
    try {
        const creatorAddress = req.body.walletAddress;
        const walletAddress = req.body.walletAddress;
        const contractAddress = req.body.contractAddress;
        const imageUrl = req.body.imageUrl;
        const tokenID = req.body.tokenID;
        const category = req.body.category;
        const nftName = req.body.nftName;
        const description = req.body.description;
        const royalties = req.body.royalties;

        const token = await Token.create({
            creatorAddress: creatorAddress,
            walletAddress: walletAddress,
            contractAddress: contractAddress,
            imageUrl: imageUrl,
            tokenID: tokenID,
            category: category,
            nftName: nftName,
            description: description,
            royalties: royalties

        }); 
        const increasedSupply = await Collection.findOneAndUpdate({contractAddress: contractAddress}, { $inc: {totalSupply: 1} }, {new: true})
        return res.status(200).json({status: true, data: token, newSupply: increasedSupply});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.addTokenAndPutOnSale = async (req, res, next) => {
    try {
        const creatorAddress = req.body.walletAddress;
        const walletAddress = req.body.walletAddress;
        const contractAddress = req.body.contractAddress;
        const imageUrl = req.body.imageUrl;
        const tokenID = req.body.tokenID;
        const category = req.body.category;

        const ownerAddress = req.body.ownerAddress;
        const price = req.body.price;
        const currency = req.body.currency

        const nftName = req.body.nftName;
        const description = req.body.description;
        const royalties = req.body.royalties;

        
        const token = await Token.create({
            creatorAddress: creatorAddress,
            walletAddress: walletAddress,
            contractAddress: contractAddress,
            imageUrl: imageUrl,
            tokenID: tokenID,
            category: category,
            nftName: nftName,
            description: description,
            royalties: royalties
        });
        
        const increasedSupply = await Collection.findOneAndUpdate({contractAddress: contractAddress}, { $inc: {totalSupply: 1} }, {new: true})
        
        const order = await Order.create({
            ownerAddress: ownerAddress,
            contractAddress: contractAddress,
            tokenID: tokenID,
            price: price,
            currency: currency
        });

        return res.status(200).json({status: true, data: {token, order}, newSupply: increasedSupply } );

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getToken = async (req, res, next) => {
    try {
        const token = await Token.findOne(req.body);
        return res.status(200).json({status: true, data: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAllTokensOfCreator = async (req, res, next) => {
    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const creatorAddress = req.body.creatorAddress;

        const token = await Token.aggregate([
            {
                $match: {creatorAddress: creatorAddress}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}

        ])

        return res.status(200).json({ status: true, data: token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getTokenAndDetails = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress
        const walletAddress = req.body.walletAddress
        const tokenID = req.body.tokenID

        const token = await Token.findOne({contractAddress: contractAddress, tokenID: tokenID});
        const user = await User.findOne({walletAddress: walletAddress});
        const creator = await User.findOne({walletAddress: token.creatorAddress})
        const order = await Order.findOne({contractAddress: contractAddress, tokenID: tokenID});

        return res.status(200).json({status: true, data: {token, user, order, creator} });

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getTokenAndDetailsOfSingleToken = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress;
        const tokenID = req.body.tokenID;

        const data = await Token.aggregate([
            {
                $match: {contractAddress: contractAddress, tokenID: tokenID}
            },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            {
                $unwind: "$users"
            },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            {
                $unwind: "$creators"
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $sort : {_id: -1}
            }
        ])

        // console.log(data)
        return res.status(200).json({status: true, data: data});
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAllTokensAndDetails = async (req, res, next) => {
    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const data = await Token.aggregate([
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getTokenById = async (req, res, next) => {
    try {
        const token = await Token.findOne({_id: Object(req.body._id)});
        return res.status(200).json({status: true, data: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getTokensOfUser = async (req, res, next) => {
    try {
        const contractAddress = req.body.walletAddress;

        const tokens = await Token.find({walletAddress: contractAddress}).sort({_id: -1});
        return res.status(200).json({status: true, data: tokens})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getOwnedTokensOfUserAndDetails = async (req, res, next) => {
    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const user = req.body.walletAddress;

        const data = await Token.aggregate([
            {
                $match: {walletAddress: user}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getOnSaleTokensOfUserAndDetails = async (req, res, next) => {
    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const user = req.body.walletAddress;

        const data = await Token.aggregate([
            {
                $match: {walletAddress: user}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $match: {"orders.ownerAddress": user}
            },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getLikedTokensOfUserAndDetails = async (req, res, next) => {
    try {

        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        let user = req.body.walletAddress;

        const data = await Token.aggregate([
            {
                $match: {
                    likedBy: { $elemMatch : {address : user} }
                }
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getCreatedTokensOfUserAndDetails = async (req, res, next) => {
    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const user = req.body.walletAddress;

        const data = await Token.aggregate([
            {
                $match: {creatorAddress: user}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}


exports.getAllTokens = async (req, res, next) => {
    try {
        const allTokens = await Token.find({}).sort({_id: -1});
        return res.status(200).json({status: true, data: allTokens});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAllTokensOfArt = async (req, res, next) => {

    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;
        
        const data = await Token.aggregate([
            {
                $match: {category: "Art"}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAllTokensOfPhotography = async (req, res, next) => {

    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const data = await Token.aggregate([
            {
                $match: {category: "Photography"}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getAllTokensOfGames = async (req, res, next) => {

    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const data = await Token.aggregate([
            {
                $match: {category: "Games"}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getAllTokensOfSports = async (req, res, next) => {

    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const data = await Token.aggregate([
            {
                $match: {category: "Sports"}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getAllTokensOfMemes = async (req, res, next) => {

    try {
        // const pageSize = req.body.limit || 10;
        // const page = req.body.page || 1;

        const data = await Token.aggregate([
            {
                $match: {category: "Memes"}
            },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            // {
            //     $skip : (pageSize * (page - 1))
            // },
            // {
            //     $limit : (pageSize)
            // }}
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getTop3TokensOfCollection = async (req, res, next) => {
    try {

        const data = await Token.aggregate([
            // {
            //     $match: {contractAddress: search}
            // },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            {
                $limit : 3
            }
        ])

        return res.status(200).json({status: true, data: data})

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getTop4TokensOfCollection = async (req, res, next) => {
    try {

        const data = await Token.aggregate([
            // {
            //     $match: {contractAddress: search}
            // },
            {
                $lookup: {
                    from : "orders",
                    localField : "tokenID",
                    foreignField : "tokenID",
                    as : "orders"
                }
            },
            // {
            //     $unwind: "$orders"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "walletAddress",
                    foreignField : "walletAddress",
                    as: "users"
                }
            },
            // {
            //     $unwind: "$users"
            // },
            {
                $lookup: {
                    from: "users",
                    localField : "creatorAddress",
                    foreignField : "walletAddress",
                    as: "creators"
                }
            },
            // {
            //     $unwind: "$creators"
            // },
            {
                $sort : {_id: -1}
            },
            {
                $limit : 4
            }
        ])

        return res.status(200).json({status: true, data: data});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getAllTokensOfCollection = async (req, res, next) => {
    try {
        const search = req.body.contractAddress
        const getAllTokensOfCollection = await Token.find({contractAddress: search}).sort({_id: -1});
        return res.status(200).json({status: true, data: getAllTokensOfCollection})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAllTokensOfCollectionAndCollectionData = async (req, res, next) => {
    try {
        const search = req.body.contractAddress;
    
        const getCollection = await Collection.find({contractAddress: search}).sort({_id: -1});
        const getAllTokensOfCollection = await Token.find({contractAddress: search}).sort({_id: -1});
        return res.status(200).json({ status: true, data: {collection: getCollection, tokens: getAllTokensOfCollection} })
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.editToken = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const update = req.body

        const updated = await Token.updateOne({contractAddress: address}, update);
        return res.status(200).json({status: true, data: updated});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.like = async (req, res, next) => {
    try {
        console.log(req.body);

        const contractAddress = req.body.contractAddress;
        const tokenID = req.body.tokenID;
        const user = req.body.walletAddress;

        // const alreadyLiked = await User.find({
        //     walletAddress: user,
        //     likedTokens: { $all: [{contractAddress: contractAddress, tokenID: tokenID}] }
        // })

        // console.log(alreadyLiked);

        // if (alreadyLiked == []){
        //     return res.status(409).json({status: true, data: {msg:"Already Liked", liked: true} });
        // }

        const tokenCount = await Token.findOneAndUpdate({contractAddress: contractAddress, tokenID: tokenID}, { $inc: {numerOfLikes: 1}}, {new: true} );
        const userCount = await User.findOneAndUpdate({walletAddress: user}, { $inc: {numberOfLikedTokens: 1} }, {new: true} );
        const likeToken = await Token.findOneAndUpdate({contractAddress: contractAddress, tokenID: tokenID}, { $push: {likedBy: {address: user} } }, {new: true} );
        const userLikes = await User.findOneAndUpdate({walletAddress: user}, { $push: {likedTokens: {contractAddress: contractAddress, tokenID: tokenID} } }, {new: true} );

        return res.status(200).json({ status: true, data: {likeToken, userLikes, tokenCount, userCount, liked: true, likedImage: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart.png"} });

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.unlike = async (req, res, next) => {
    try {
        console.log(req.body);

        const contractAddress = req.body.contractAddress;
        const tokenID = req.body.tokenID;
        const user = req.body.walletAddress;

        // const alreadyLiked = await User.find({
        //     walletAddress: user,
        //     likedTokens: { $all: [{contractAddress: contractAddress, tokenID: tokenID}] }
        // })

        // console.log(alreadyLiked);

        // if (alreadyLiked != []){
        //     return res.status(200).json({status: true, data: {msg:"Already UnLiked", liked: false} });
        // }        

        const tokenCount = await Token.findOneAndUpdate({contractAddress: contractAddress, tokenID: tokenID}, { $inc: {numerOfLikes: -1}}, {new: true} );
        const userCount = await User.findOneAndUpdate({walletAddress: user}, { $inc: {numberOfLikedTokens: -1} }, {new: true} );
        const likeToken = await Token.findOneAndUpdate({contractAddress: contractAddress, tokenID: tokenID}, { $pull: {likedBy: {address: user} } }, {new: true} );
        const userLikes = await User.findOneAndUpdate({walletAddress: user}, { $pull: {likedTokens: {contractAddress: contractAddress, tokenID: tokenID} } }, {new: true} );

        return res.status(200).json({ status: true, data: {likeToken, userLikes, tokenCount, userCount, liked: false, unLikedImage: "https://kashmiri-s3.s3.ap-southeast-1.amazonaws.com/heart-outline-icon.png"} });

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getLikesOfNFT = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress;
        const tokenID = req.body.tokenID;

        const likes = await Token.findOne({contractAddress: contractAddress, tokenID: tokenID});
    
        return res.status(200).json({status: true, data: {likedBy: likes.likedBy, numerOfLikes: likes.numerOfLikes} });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getLikedByUser = async (req, res, next) => {
    try {
        const walletAddress = req.body.walletAddress;

        const likedByUser = await Token.find({ likedBy: { $all: [{address: walletAddress}] } })
        return res.status(200).json({status: true, data: likedByUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAlreadyLiked = async (req, res, next) => {
    try {
        const user = req.body.walletAddress
        const contractAddress = req.body.contractAddress
        const tokenID = req.body.tokenID

        const alreadyLiked = await Token.find({
            contractAddress: contractAddress,
            tokenID: tokenID,
            likedBy: { $all: [{address: user}] }
        })

        if (!alreadyLiked || !Array.isArray(alreadyLiked) || alreadyLiked.length <= 0){
            return res.status(200).json({status: true, data: false});
        }

        return res.status(200).json({status: true, data: true})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getTokensFromHighToLow = async (req, res, next) => {
    try {
        const token = await Token.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "tokenID",
                    foreignField: "tokenID",
                    as: "orders"
                }
            },
            {
                $sort: { orders: { price: -1 } }
            }
        ])

        return res.status(200).json({status: true, data: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, msg : error.message});        
    }
}

exports.getTokensFromLowToHigh = async (req, res, next) => {
    try {
        const token = await Token.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "tokenID",
                    foreignField: "tokenID",
                    as: "orders"
                }
            },
            {
                $sort: { orders: { price: 1 } }
            }
        ])

        return res.status(200).json({status: true, data: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, msg : error.message});        
    }
}