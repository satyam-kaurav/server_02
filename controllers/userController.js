const { serverError, success } = require("../utils/response");

const userSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    return success(res, "Sign-up data", { username, email, password });
  } catch (error) {
    return serverError(res, error);
  }
};

module.exports = { userSignUp };
