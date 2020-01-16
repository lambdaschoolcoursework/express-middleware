const express = require('express');
const cors = require('cors');
const postRouter = require('../posts/postRouter');
const userRouter = require('../users/userRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/users', logger, userRouter);

server.get('/', (request, response) => {
  	response.send({message: 'router is working'});
});

// custom middleware
function logger(request, response, next) {
	console.log(request.method, 'to', request.originalUrl, request.body, 'at', Date.now());
	next();
};

module.exports = server;
