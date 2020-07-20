const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const requiredLogin = require("../middlewares/requireLogin.mdw");

router.get("/user/:id", requiredLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            res.json({ user, posts });
          }
        });
    });
});

router.put("/follow", requiredLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { followings: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((err) => res.status(422).json({ error: err }));
    }
  );
});

router.put("/unfollow", requiredLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { followings: req.body.unfollowId },
          },
          { new: true }
        )
          .select("-password")
          .then((result) => res.json(result))
          .catch((err) => res.status(422).json({ error: err }));
      }
    }
  );
});

module.exports = router;
