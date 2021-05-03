// const router = require("express").Router();
const User = require("../models/users.model");

const addCash = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  if (amount < 0) {
    return res.status(400).send({ error: "need to be a positive integer" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { $inc: { cash: amount } });
    if (!user) {
      return res.status(400).send({ error: "Cannot find user" });
    }
    user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const addCredit = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { $inc: { credit: amount } });
    if (!user) {
      return res.status(400).send({ error: "Cannot find user" });
    }
    user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const withdraw = async (req, res) => {
  const { id } = req.params;

  const { amount } = req.body;

  try {
    if (user.cash + user.credit < amount) {
      return res.status(400).send({ error: "User doesn't have enough funds" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { $inc: { cash: -amount } },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ error: "Cannot find user" });
    }
    // user.save();
    return res.send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const transfer = async (req, res) => {
  const { idFrom, idTo } = req.params;
  const { amount } = req.body;

  if (fromUser.cash + fromUser.credit < amount) {
    return res.status(400).send({ error: "not enough funds" });
  }

  try {
    const fromUser = await User.findByIdAndUpdate(
      idFrom,
      { $inc: { cash: -amount } },
      { new: true }
    );
    const toUser = await User.findByIdAndUpdate(
      idTo,
      { $inc: { cash: amount } },
      { new: true }
    );

    if (!fromUser || !toUser) {
      return res.status(400).send({ error: "cannot find user/s" });
    }

    // await fromUser.save();
    // await toUser.save();
    return res.send([fromUser, toUser]);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  withdraw,
  transfer,
  addCredit,
  addCash,
};
