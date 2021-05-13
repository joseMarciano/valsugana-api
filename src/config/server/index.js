const express = require('express');
const {sequelize} = require('../../api/models/index');

(async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();


module.exports = express()
    .use(express.json());