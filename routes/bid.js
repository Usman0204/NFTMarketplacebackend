const Router = require('express').Router();
const {bidController} = require('../controllers')

Router.post('/addBid', bidController.addBid);
Router.post('/getBids', bidController.getBids);
Router.post('/getBidsByBidder', bidController.getBidsByBidder);
Router.post('/getBidsByContractAddress', bidController.getBidsByContractAddress);
Router.post('/getBidsByTokenID', bidController.getBidsByTokenID);
Router.post('/getAllBids', bidController.getAllBids);
Router.post('/removeBid', bidController.removeBid);

module.exports = Router;
