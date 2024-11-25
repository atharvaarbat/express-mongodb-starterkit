const User = require("../models/user.model");

const getUser = async (req, res) => {
    const examples = await User.find();
    res.json(examples);
};

const createUser = async (req, res) => {
    const { name, description } = req.body;
    const example = await User.create({ name, description });
    res.status(201).json(example);
};

module.exports = {
    getUser,
    createUser,
};