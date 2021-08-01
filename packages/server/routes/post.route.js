const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const requiredLogin = require("../middlewares/requireLogin.mdw");

router.get("/allpost", requiredLogin, (req, res) => {
  Post.find()
    .populate("postedBy", " _id name pic")
    .populate({ path: "comments.postedBy", select: "_id name" })
    .then((posts) => res.json({ posts: posts }))
    .catch((err) => console.log(err));
});

router.get("/getsubpost", requiredLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.followings } })
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

router.post("/createpost", requiredLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    res.status(422).json({ error: "please add all the fields" });
  }

  const post = new Post({ title, body, pic, postedBy: req.user });

  post
    .save()
    .then((result) => res.json({ post: result }))
    .catch((err) => console.log(err));
});

router.get("/mypost", requiredLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => console.log(err));
});

router.put("/like", requiredLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", requiredLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", requiredLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ err: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/delete/:postId", requiredLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
