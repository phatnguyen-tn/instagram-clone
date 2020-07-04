const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const requiredLogin = require('../middlewares/requireLogin.mdw');

router.get('/allpost', (req, res) => {
    Post.find().populate('postedBy', ' _id name').then(posts => res.json({
            posts: posts
        }))
        .catch(err => console.log(err));
});

router.post('/createpost', requiredLogin, (req, res) => {
    const {
        title,
        body
    } = req.body;
    if (!title || !body) {
        res.status(422).json({
            error: "please add all the fields"
        });
    }

    const post = new Post({
        title,
        body,
        postedBy: req.user
    });

    post.save().then(result => res.json({
        post: result
    })).catch(err => console.log(err));
});

router.get('/mypost', requiredLogin, (req, res) => {
    Post.find({
        postedBy: req.user._id
    }).populate('postedBy', '_id name').then(mypost => {
        res.json({
            mypost
        });
    }).catch(err => console.log(err));
});

module.exports = router;