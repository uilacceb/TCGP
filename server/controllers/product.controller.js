import User from "../model/user.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { cardId, productName, price, quantity, imageURL } = req.body;

    const userId = req.user.id  // This assumes verifyToken adds the decoded token to req.user
    const user = await User.findById(userId);


    // const username = req.user.username
    // const user = await User.findOne(username);

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
    const { username } = req.params;

    const user = await User.findOne({ username: username })

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

// Add this to your product.controller.js
export const removeCartItem = async (req, res) => {
  try {
    console.log("Request to remove item:", req.body);
    const { username, cardId } = req.body;

    if (!username) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({username});
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Find the item in the cart
    const initialLength = user.purchasedItems.length;
    
    // Remove the item from purchasedItems array
    user.purchasedItems = user.purchasedItems.filter(item => item.cardId !== cardId);
    
    // Check if an item was actually removed
    if (user.purchasedItems.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    await user.save();
    
    // Calculate new total
    const totalPrice = user.purchasedItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
    
    res.status(200).json({
      message: "Item removed from cart",
      cartItems: user.purchasedItems,
      totalPrice
    });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};