const Router = require('express').Router();
const {userController} = require('../controllers')

Router.post('/addUser', userController.addUser);
Router.post('/getUser', userController.getUser);
Router.get('/getAllUsers', userController.getAllUsers);
Router.post('/deleteUser', userController.deleteUser);
Router.post('/editUser', userController.editUser);
Router.post('/userAlreadyExists', userController.alreadyExists);
Router.post('/addFollower', userController.addFollower);
Router.post('/removeFollower', userController.removeFollower);
Router.post('/getFollowers', userController.getFollowers);
Router.post('/getFollowing', userController.getFollowing);
Router.post('/getNumberOfFollowers', userController.getNumberOfFollowers);
Router.post('/getNumerOfFollowing', userController.getNumberOfFollowing);
Router.post('/getAlreadyFollowing', userController.getAlreadyFollowing);
Router.post('/getAlreadyFollowed', userController.getAlreadyFollowed);
Router.post('/getFollowersAndDetails', userController.getFollowersAndDetails);
Router.post('/getFollowingAndDetails', userController.getFollowingAndDetails);

module.exports = Router;