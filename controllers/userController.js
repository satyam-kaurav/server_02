const { uploadFileToMinIO } = require("../configs/minio");
const User = require("../models/User");
const { serverError, success } = require("../utils/response");
const u_id = require("../utils/u_id");

const userSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const image_file = req.file;

    const image_key = await uploadFileToMinIO(image_file, "/profile-pic");

    const user = await User.create({
      user_tag: await u_id(),
      image_key,
      username,
      email,
      password,
    });

    return success(res, "Sign-up data", user);
  } catch (error) {
    return serverError(res, error);
  }
};

module.exports = { userSignUp };
