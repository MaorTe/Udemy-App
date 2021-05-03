const User = require("../models/users.model");

const addUser = async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  const { cash } = user;
  if (cash < 0) {
    return res.status(400).send({ error: "cash must be a positive integer" });
  }
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({ error: "Cannot find users" });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const users = await User.deleteMany({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).send({ error: "Cannot find user" });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  deleteUsers,
  deleteUser,
};
