const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user.model");
const { JWT_SECRET } = require("../configs/key");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: "please add all the fields",
    });
  }

  User.findOne({
    email: email,
  }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({
        error: "user already exist with that email",
      });
    }

    bcrypt.hash(password, 10).then((hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          res.json({
            message: "saved user successfully",
          });
        })
        .catch((error) => console.log(error));
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "please add all the fields",
    });
  }

  User.findOne({
    email: email,
  })
    .then((savedUser) => {
      if (!savedUser)
        return res.status(422).json({
          Error: "Invalid email or password",
        });

      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, followings, pic } = savedUser;
          res.json({
            token,
            user: { _id, name, email, followers, followings, pic },
          });
        } else {
          return res.status(422).json({
            message: "Invalid email or password",
          });
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
