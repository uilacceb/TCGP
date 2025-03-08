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

export const addToCart = async (req, res) => {
  try {
    const { username, cardId, name, price, quantity, image } = req.body;
    const user = await User.findOne(req.params.username);
    const existingItemIndex = user.purchasedItems.findIndex(item => item.cardId === cardId);
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      user.purchasedItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.purchasedItems.push({
        cardId,
        name,
        price,
        quantity,
        image
      });
    }
    await user.save();

    res.status(200).json({
      message: "Item added to cart",
      cartItems: user.purchasedItems
    });
  } catch (err) {
    res.status(500).json({ message: err })
  }
}