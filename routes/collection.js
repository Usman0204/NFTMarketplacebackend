const Router = require('express').Router();
const {collectionController} = require('../controllers')

Router.post('/addCollection', collectionController.addCollection);
Router.post('/getCollection', collectionController.getCollection);
Router.get('/getAllCollections', collectionController.getAllCollections);
// Router.post('/getCollectionToken', collectionController.getCollectionToken);
Router.post('/editCollection', collectionController.editCollection);
// Router.post('/addTokenInCollection', collectionController.addTokenInCollection);
// Router.post('/addAttributesInToken', collectionController.addAttributesInToken);
Router.post('/getCollectionByCreatorAddress', collectionController.getCollectionByCreatorAddress)
Router.post('/urlExists', collectionController.urlExists);


module.exports = Router;