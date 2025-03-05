import User from "../model/user.model.js"
import { UserErrors } from "../errors.js";
import bcrypt from "bcrypt"

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
