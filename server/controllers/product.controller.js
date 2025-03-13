import User from "../model/user.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { cardId, productName, price, quantity, imageURL } = req.body;

    // Ensure quantity is a number
    const numericQuantity = parseInt(quantity, 10);

    if (isNaN(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Get user ID from auth token
    const userId = req.user.id;

    // First, try to update existing item in cart
    const updateResult = await User.findOneAndUpdate(
      {
        _id: userId,
        "purchasedItems.cardId": cardId
      },
      {
        $inc: { "purchasedItems.$.quantity": numericQuantity }
      },
      {
        new: true
      }
    );

    // If an item was updated (user has this item in cart already)
    if (updateResult) {
      return res.status(200).json({
        message: "Item quantity updated in cart",
        cartItems: updateResult.purchasedItems
      });
    }

    // If no item was updated, add new item to cart
    // Using $push to add to the array
    const addResult = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          purchasedItems: {
            cardId,
            productName,
            price,
            quantity: numericQuantity,
            imageURL
          }
        }
      },
      {
        new: true,
        upsert: true, // Create the document if it doesn't exist
        setDefaultsOnInsert: true
      }
    );

    if (!addResult) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Item added to cart",
      cartItems: addResult.purchasedItems
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding item to cart", error: err.message });
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

    const user = await User.findOne({ username });

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


export const updateCartItem = async (req, res) => {
  try {
    const { username, cardId, quantity } = req.body;

    // Ensure quantity is a number
    const numericQuantity = parseInt(quantity, 10);

    if (isNaN(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Use findOneAndUpdate with MongoDB's array update operators
    // This is more reliable than finding, modifying, and saving
    const result = await User.findOneAndUpdate(
      {
        username: username,
        "purchasedItems.cardId": cardId
      },
      {
        $set: { "purchasedItems.$.quantity": numericQuantity }
      },
      {
        new: true,  // Return the updated document
        runValidators: true  // Run schema validators
      }
    );

    if (!result) {
      return res.status(404).json({ message: "User or item not found" });
    }

    console.log("Database updated successfully");

    res.status(200).json({
      message: "Cart updated successfully",
      cartItems: result.purchasedItems
    });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}