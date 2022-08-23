const Router = require('express').Router();
const {orderController} = require('../controllers')

Router.post('/createOrder', orderController.createOrder);
Router.post('/editOrder', orderController.editOrder);
Router.post('/deleteOrder', orderController.deleteOrder);
Router.post('/getOrdersByContractAddress', orderController.getOrdersByContractAddress);
Router.post('/getOrdersByContractTokenID', orderController.getOrdersByContractTokenID);
Router.post('/getOrdersByOwnerAddress', orderController.getOrdersByOwnerAddress);
Router.post('/getOrder', orderController.getOrders);
Router.get('/getAllOrders', orderController.getAllOrders)

module.exports = Router;
