const Bid = require('../models/bid')

exports.addBid = async (req, res, next) => {
    try {
        console.log(req.body);
        const bid = await Bid.create(req.body); 
        return res.status(200).json({status: true, data: bid});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getBids = async (req, res, next) => {
    try {
        const bid = await Bid.find(req.body);
        return res.status(200).json({status: true, data: bid})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}


exports.getBidsByBidder = async (req, res, next) => {
    try {
        const bidder = req.body.bidderAddress;

        const bid = await Bid.find({bidderAddress: bidder});
        return res.status(200).json({status: true, data: bid});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getBidsByContractAddress = async (req, res, next) => {
    try {
        const contract = req.body.contractAddress;

        const bid = await Bid.find({contractAddress: contract});
        return res.status(200).json({status: true, data: bid});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getBidsByTokenID = async (req, res, next) => {
    try {
        const token = req.body.tokenID

        const bid = await Bid.find({tokenID: token});
        return res.status(200).json({status: true, data: bid});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAllBids = async (req, res, next) => {
    try {
        const bid = await Bid.find({});

        return res.status(200).json({status: true, data: bid});
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.removeBid = async (req, res, next) => {
    try {
        const bidder = req.body.bidderAddress;
        const contract = req.body.contractAddress;
        const token = req.body.tokenID;

        const bid = await Bid.findOneAndDelete({bidderAddress:bidder, contractAddress:contract, tokenID:token});
        return res.status(200).json({status: true, data: bid})

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}