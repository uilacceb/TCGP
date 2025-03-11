import User from "../model/user.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { cardId, productName, price, quantity, imageURL } = req.body;

    // const userId = req.user.id  // This assumes verifyToken adds the decoded token to req.user
    // const user = await User.findById(userId);


    const username = req.user.username
    const user = await User.findOne(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize purchasedItems array if it doesn't exist
    if (!user.purchasedItems) {
      user.purchasedItems = [];
    }

    // Check if item already exists in cart
    const existingItemIndex = user.purchasedItems.findIndex(item => item.cardId === cardId);

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      user.purchasedItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.purchasedItems.push({
        cardId,
        productName,
        price,
        quantity,
        imageURL
      });
    }

    await user.save();

    res.status(200).json({
      message: "Item added to cart",
      cartItems: user.purchasedItems
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json();
  }
};

// Get user's cart items
export const getCartItems = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cartItems: user.purchasedItems || []
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};