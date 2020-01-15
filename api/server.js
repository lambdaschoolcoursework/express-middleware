const express = require('express');

const server = express();

server.get('/', (request, response) => {
  	response.send({message: 'router is working'});
});

// custom middleware
function logger(req, res, next) {

};

module.exports = server;
