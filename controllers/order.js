const Order = require('../models/order')

exports.createOrder = async (req, res, next) => {
    try {
        console.log(req.body)

        const create = await Order.create(req.body);
        return res.status(200).json({status: true, data: create});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.editOrder = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress
        const tokenID = req.body.tokenID
        const ownerAddress = req.body.ownerAddress;
        const update = req.body

        const updated = await Order.updateOne({ownerAddress: ownerAddress, contractAddress: contractAddress, tokenID: tokenID}, update)
        return res.status(200).json({ status: true, data: updated });

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress
        const tokenID = req.body.tokenID
        const ownerAddress = req.body.ownerAddress;

        const deleted = await Order.deleteOne({ownerAddress: ownerAddress, contractAddress: contractAddress, tokenID: tokenID})
        return res.status(200).json({status: true, data : deleted});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message})
    }
}

exports.getOrdersByContractAddress = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress

        const result = await Order.find({contractAddress: contractAddress});
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getOrdersByContractTokenID = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress
        const tokenID = req.body.tokenID

        const result = await Order.find({contractAddress: contractAddress, tokenID: tokenID});
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getOrdersByOwnerAddress = async (req, res, next) => {
    try {
        const ownerAddress = req.body.ownerAddress;

        const result = await Order.find({ownerAddress: ownerAddress});
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const contractAddress = req.body.contractAddress
        const tokenID = req.body.tokenID
        const ownerAddress = req.body.ownerAddress;

        const result = await Order.find({contractAddress: contractAddress, tokenID: tokenID, ownerAddress: ownerAddress});
        return res.status(200).json({ status: true, data: result});

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const result = await Order.find({});
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        return res.status(500).json({status: false, msg : error.message});
    }
}