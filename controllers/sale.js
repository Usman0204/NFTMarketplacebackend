const Sale = require('../models/sale')
const User = require('../models/user')
const Token = require('../models/token')
const Order = require('../models/order')

exports.addSale = async (req, res, next) => {
    try {

        console.log(req.body)

        const buyer = req.body.buyerAddress;
        const seller = req.body.sellerAddress;
        const contractAddress = req.body.contractAddress;
        const tokenID = req.body.tokenID;
        const price = req.body.price;
        const royalties = req.body.royalties;

        const sale = Sale.create({
            buyerAddress: buyer,
            sellerAddress: seller,
            contractAddress: contractAddress,
            tokenID: tokenID,
            price: price,
            royalties: royalties
        });

        const token = await Token.findOneAndUpdate({walletAddress: seller, contractAddress: contractAddress, tokenID: tokenID}, {walletAddress: buyer});
        const order = await Order.findOneAndRemove({ownerAddress: seller, contractAddress: contractAddress, tokenID: tokenID});

        return res.status(200).json({status: true, data: {sale, token, order} });
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});        
    }
}

exports.editSale = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const tokenID = req.body.tokenID
        const update = req.body

        const updated = await Sale.updateOne({contractAddress: address, tokenID: tokenID}, update)
        return res.status(200).json({ status: true, data: updated});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getAllSales = async (req , res, next) => {
    try {
        const result = await Sale.find({});
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }

}

exports.getSaleByContractToken = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const tokenID = req.body.tokenID;

        const result = await Sale.find({contractAddress: address, tokenID: tokenID});
        return res.status(200).json({ status: true, data: result });
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getSaleByBuyer = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const tokenID = req.body.tokenID;
        const buyer = req.body.buyerAddress

        const result = await Sale.find({contractAddress: address, tokenID: tokenID, buyerAddress: buyer});
        return res.status(200).json({ status: true, data: result });
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getSaleBySeller = async (req, res, next) => {
    try {
        const address = req.body.contractAddress;
        const tokenID = req.body.tokenID;
        const seller = req.body.sellerAddress

        const result = await Sale.find({contractAddress: address, tokenID: tokenID, sellerAddress: seller});
        return res.status(200).json({ status: true, data: result });
        
    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}
