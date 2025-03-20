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
    // console.log(token)

    res.status(200).json({ token, userID: user._id })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Log the token to help with debugging
    // console.log("Token received:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        return res.status(403).json({ message: "Invalid token", error: err.message });
      }

      // Add decoded user info to request object
      req.user = decoded;
      // console.log("Token verified successfully for user:", decoded.id);
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};


export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne(req.params.username);
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export const getUserPurchase = async (req, res) => {
  try {
    const user = await User.findOne(req.params.username);
    const purchaseItems = user.purchasedItems;
    res.status(200).json(purchaseItems)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const logOut = async (req, res) => {
  try { res.status(200).json({ message: "Logout successfully" }) } catch (err) {
    res.status(500).json({ message: "Error during log out" })
  }

}
