const Router = require('express').Router();
const {saleController} = require('../controllers')

Router.post('/addSale', saleController.addSale);
Router.post('/editSale', saleController.editSale);
Router.get('/getAllSales', saleController.getAllSales);
Router.post('/getSaleByContractToken', saleController.getSaleByContractToken);
Router.post('/getSaleByBuyer', saleController.getSaleByBuyer);
Router.post('/getSaleBySeller', saleController.getSaleBySeller);

module.exports = Router;
