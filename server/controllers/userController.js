const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

const createUser = async (req, res) => {
   const user = new User(req.body);
   try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
   } catch (e) {
      res.status(400).send(e);
   }
};
module.exports = { createUser };
