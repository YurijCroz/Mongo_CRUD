const mongoose = require("mongoose");
const env = process.env.NODE_ENV || 'development';
const {host, port, database} = require('../config/mongo.json')[env];

mongoose.connect(`mongodb://${host}:${port}/${database}`, (error) => {
  error
    ? console.error("Error conection with mongod")
    : console.log("Connection with mondo db is success!!! ");
});

module.exports = mongoose.connection;