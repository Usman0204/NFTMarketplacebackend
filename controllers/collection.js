const Collection = require('../models/collection')


exports.addCollection = async (req, res, next) => {
    try {
        const collection = await Collection.create(req.body); 
        return res.status(200).json({status: true, data: collection});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getCollection = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;

        const collection = await Collection.findOne({contractAddress: address});
        return res.status(200).json({status: true, data: collection});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getCollectionByCreatorAddress = async (req, res, next) => {
    try {
        const address = req.body.creator

        const result = await Collection.find({creator: address});
        return res.status(200).json({status: true, data: result});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAllCollections = async (req, res, next) => {
    try {
        const allCollections = await Collection.find({});
        return res.status(200).json({status: true, data: allCollections});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

// exports.getCollectionToken = async (req, res, next) => {
//     try {
//         const getCollectionToken = await Collection.findOne(req.body);
//         const token = getCollectionToken[0].token[req.body.tokenID];
//         return res.status(200).json({status: true, data: token});
//     } catch (error) {
//         return res.status(500).json({status: false, msg : error.message});
//     }
// }

exports.editCollection = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const update = req.body

        const updated = await Collection.updateOne({contractAddress: address}, update);
        return res.status(200).json({status: true, data: updated});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

// exports.addTokenInCollection = async (req , res, next) => {
//     try {
        
//         const address = req.body.contractAddress;
//         const update = { 
//             tokenID: req.body.tokenID,
//             walletAddress: req.body.walletAddress,
//             name: req.body.name,
//             description: req.body.description,
//             image: req.body.image,
//             attributes: req.body.attributes
//         }

//         const updated = await Collection.findOneAndUpdate({contractAddress: address}, {$push: {token: update}})
//         const collection = await Collection.findOne({contractAddress: address})
//         const newSupply = collection[0].totalSupply + 1;
//         const newId = await Collection.findOneAndUpdate({contractAddress: address}, { $set: { token: { tokenID: newSupply - 1 } } } )   //collection[0].token[newSupply - 1].tokenID
//         const updatedSupply = await Collection.findOneAndUpdate({contractAddress: address}, {totalSupply: newSupply})

//         return res.status(200).json({ status: true, data: updated, totalSupply: updatedSupply, tokenID: newId});

//     } catch (error) {
//         return res.status(500).json({status: false, msg : error.message});
//     }
// }

// exports.editTokenInCollection = async (req, res, next) => {
//     try {
//         const address = req.body.contractAddress;
//         const update = { 
//             tokenID: req.body.tokenID,
//             walletAddress: req.body.walletAddress,
//             name: req.body.name,
//             description: req.body.description,
//             image: req.body.image,
//             attributes: req.body.attributes
//         }

//         const updated = await Collection.findOneAndUpdate({contractAddress: address}, {$set: {token: update}})

//     } catch (error) {
        
//     }
// }

// exports.addAttributesInToken = async (req, res, next) => {
//     try {
        
//         const address = req.body.contractAddress;
//         const tokenID = req.body.tokenID;
//         const update = req.body.attributes

//         const collection = await Collection.findOne({contractAddress: address});
//         const tokens = collection[0].token[tokenID];
//         tokens.attributes.push(update);
//         const updated = await Collection.updateOne({contractAddress: address}, {token: tokens} )
//         return res.status(200).json({status: true, data: updated});

//     } catch (error) {
//         return res.status(500).json({status: false, msg : error.message});
//     }
// }

exports.urlExists = async (req, res, next) => {
    try {
        const url = req.body
        const result = await Collection.find({publicUrl: url})
        return res.status(200).json({status: true, data: result});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}
