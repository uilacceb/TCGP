import User from "../model/user.model.js"
import { UserErrors } from "../errors.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: UserErrors.USERNAME_ALREADY_EXISTS })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ username, password: hashedPassword })
    res.status(200).json({ message: "User Registered Successfully" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: UserErrors.NO_USER_FOUND })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: UserErrors.WRONG_CREDENTIALS })
    }
    //jwt sign
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
    console.log(token)

    res.status(200).json({ token, userID: user._id })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: err })
      }

      next();
    });
  }
  return res.status(401).json();
};
