const mongoose = require('mongoose');

module.exports = {
    conn : async () => {
        mongoose.connect(`${process.env.dbURL}`,
            { 
                useNewUrlParser: true,
            })
            .then((conn) => {
                console.log('CONNECTED TO DATABASE');

                // mongoose.connection.db.dropDatabase();               // USED TO DROP DB
                // console.log('DROPPED DB:::')

            }).catch((error) => {
                console.log('error in DB connection :::::', error)
            });
    }
}