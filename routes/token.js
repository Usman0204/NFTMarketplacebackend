const Router = require('express').Router();
const {tokenController} = require('../controllers')

Router.post('/addToken', tokenController.addToken);
Router.post('/getToken', tokenController.getToken);
Router.get('/getAllTokens', tokenController.getAllTokens);
Router.post('/editToken', tokenController.editToken);
Router.get('/getTop3TokensOfCollection', tokenController.getTop3TokensOfCollection);
Router.get('/getTop4TokensOfCollection', tokenController.getTop4TokensOfCollection);
Router.post('/getAllTokensOfCollection', tokenController.getAllTokensOfCollection);
Router.post('/getTokenById', tokenController.getTokenById);
Router.post('/getAllTokensOfCollectionAndCollectionData', tokenController.getAllTokensOfCollectionAndCollectionData);
Router.post('/getTokensOfUser', tokenController.getTokensOfUser);
Router.post('/addTokenAndPutOnSale', tokenController.addTokenAndPutOnSale);
Router.post('/getTokenAndDetails', tokenController.getTokenAndDetails);
Router.get('/getAllTokensOfArt', tokenController.getAllTokensOfArt);
Router.get('/getAllTokensOfPhotography', tokenController.getAllTokensOfPhotography);
Router.get('/getAllTokensOfGames', tokenController.getAllTokensOfGames);
Router.get('/getAllTokensOfSports', tokenController.getAllTokensOfSports);
Router.get('/getAllTokensOfMemes', tokenController.getAllTokensOfMemes);
Router.post('/like', tokenController.like);
Router.post('/unlike', tokenController.unlike);
Router.post('/getAlreadyLiked', tokenController.getAlreadyLiked);
Router.post('/getLikesOfNFT', tokenController.getLikesOfNFT);
Router.post('/getLikedByUser', tokenController.getLikedByUser);
Router.post('/getAllTokensOfCreator', tokenController.getAllTokensOfCreator); 
Router.get('/getAllTokensAndDetails', tokenController.getAllTokensAndDetails);
Router.get('/getTokensFromHighToLow', tokenController.getTokensFromHighToLow);
Router.get('/getTokensFromLowToHigh', tokenController.getTokensFromLowToHigh);
Router.post('/getOwnedTokensOfUserAndDetails', tokenController.getOwnedTokensOfUserAndDetails);
Router.post('/getOnSaleTokensOfUserAndDetails', tokenController.getOnSaleTokensOfUserAndDetails);
Router.post('/getLikedTokensOfUserAndDetails', tokenController.getLikedTokensOfUserAndDetails);
Router.post('/getCreatedTokensOfUserAndDetails', tokenController.getCreatedTokensOfUserAndDetails);
Router.post('/getTokenAndDetailsOfSingleToken', tokenController.getTokenAndDetailsOfSingleToken);

module.exports = Router;