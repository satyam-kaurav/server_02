const User = require("../models/User");
const { serverError, success } = require("../utils/response");

const userSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    return success(res, "Sign-up data", user);
  } catch (error) {
    return serverError(res, error);
  }
};

module.exports = { userSignUp };
