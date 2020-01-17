const express = require('express');
const model = require('./userDb');

const router = express.Router();

// create user
router.post('/', validateUser, (request, response) => {
    model.insert(request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error creating user'}));
});

// create post
// router.post('/:id/posts', validateUserId, validatePost, (request, response) => {
//     model.insert(request.body.text)
//         .then(res => response.status(200).json(res))
//         .catch(err => response.status(500).json({message: 'error creating post'}));
// });

// fetch all users
router.get('/', (request, response) => {
    model.get()
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error fetching posts'}))
});

// fetch user
router.get('/:id', validateUserId, (request, response) => {
    model.getById(request.params.id)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error fetching user'}));
});

// fetch user's posts
router.get('/:id/posts', validateUserId, (request, response) => {
    model.getUserPosts(request.params.id)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: "error fetching user's posts"}));
});

// delete user
router.delete('/:id', validateUserId, (request, response) => {
    model.remove(request.params.id)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error deleting user'}));
});

// edit user
router.put('/:id', validateUserId, validateUser, (request, response) => {
    model.update(request.params.id, request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error updating user'}));
});

//custom middleware
function validateUserId(request, response, next) {
    model.getById(request.params.id)
        .then(res => res ? next() : response.status(400).json({message: 'user with specified id does not exist'}))
        .catch(err => response.status(500).json({message: 'error fetching user'}))
};

function validateUser(request, response, next) {
    if (isEmpty(request.body)) {
        response.status(400).json({message: 'request body missing'});
    } else if (!request.body.name) {
        response.status(400).json({message: 'name value missing'});
    } else {
        next();
    };
};

function validatePost(request, response, next) {
    if (!request.body) {
        response.status(400).json({message: 'request body missing'});
    } else if (!request.body.text) {
        response.status(400).json({message: 'text value missing'});
    } else {
        next();
    };
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    };
    return true;
};

module.exports = router;
