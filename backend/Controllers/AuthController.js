const UserModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const { name, age, location, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({
          message: "user already existed! you can login",
          success: false,
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, age, location, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({ message: "Signup Successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const existingUser = await UserModel.findOne({email})
    if (!existingUser) {
      return res
        .status(401)
        .json({
          message: "user not existed! you can signup",
          success: false,
        });
    }
    const isPassEqual = await bcrypt.compare(password, existingUser.password)
    if (!isPassEqual) {
      return res
        .status(401)
        .json({
          message: "Wrong Password",
          success: false,
        });
    }
    const jwtToken = jwt.sign(
      {email: existingUser.email, _id: existingUser._id},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    )

    res.status(200).json({ message: "Login Successfully", success: true, jwtToken, email, name: existingUser.name, age: existingUser.age, location: existingUser.location });

  } catch (error) {
    return res
        .status(500)
        .json({
          message: "Internal Server error",
          success: false,
        });
  }
};

module.exports = {
  signup,
  login,
};
