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
        "shoppingCartItems.cardId": cardId
      },
      {
        $inc: { "shoppingCartItems.$.quantity": numericQuantity }
      },
      {
        new: true
      }
    );

    // If an item was updated (user has this item in cart already)
    if (updateResult) {
      return res.status(200).json({
        message: "Item quantity updated in cart",
        cartItems: updateResult.shoppingCartItems
      });
    }

    // If no item was updated, add new item to cart
    // Using $push to add to the array
    const addResult = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          shoppingCartItems: {
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
      cartItems: addResult.shoppingCartItems
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding item to cart", error: err.message });
  }
};

// Get user's cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cartItems: user.shoppingCartItems || []
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

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
    const initialLength = user.shoppingCartItems.length;

    // Remove the item from purchasedItems array
    user.shoppingCartItems = user.shoppingCartItems.filter(item => item.cardId !== cardId);

    // Check if an item was actually removed
    if (user.shoppingCartItems.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await user.save();

    // Calculate new total
    const totalPrice = user.shoppingCartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );

    res.status(200).json({
      message: "Item removed from cart",
      cartItems: user.shoppingCartItems,
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
        "shoppingCartItems.cardId": cardId
      },
      {
        $set: { "shoppingCartItems.$.quantity": numericQuantity }
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
      cartItems: result.shoppingCartItems
    });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

export const checkout = async (req, res) => {
  try {
    const { username } = req.body;

    // Get user from authenticated token
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Additional validation - check if the authenticated user matches the username
    if (user.username !== username) {
      return res.status(403).json({ message: "Unauthorized: Username mismatch" });
    }

    // Check if cart is empty
    if (!user.shoppingCartItems || user.shoppingCartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    const totalAmount = user.shoppingCartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );

    // Check if user has enough money
    if (user.availableMoney < totalAmount) {
      return res.status(400).json({
        message: "Insufficient funds",
        available: user.availableMoney,
        required: totalAmount
      });
    }

    // Get current cart items to move them
    const itemsToMove = [...user.shoppingCartItems];

    // Move items from shopping cart to purchased items and update money
    const result = await User.findByIdAndUpdate(
      userId,
      {
        // Clear the shopping cart
        $set: { shoppingCartItems: [] },

        // Add cart items to purchased items (directly as they are)
        $push: {
          purchasedItems: {
            $each: itemsToMove
          }
        },

        // Deduct money from available balance
        $inc: { availableMoney: -totalAmount }
      },
      { new: true }
    );

    if (!result) {
      return res.status(500).json({ message: "Failed to process checkout" });
    }

    res.status(200).json({
      message: "Checkout successful",
      remainingBalance: result.availableMoney
    });
  } catch (err) {
    console.error("Error during checkout:", err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};

export const getPurchasedItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    res.status(200).json({ purchasedItems: user.purchasedItems })
  } catch (err) {
    res.status(500).json({ message: err })
  }

}

export const getAvailableMoney = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId)
    res.status(200).json({ availableMoney: user.availableMoney })
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
}

export const removePurchasedItem = async (req, res) => {
  try {
    const { username, cardId, price, quantity } = req.body
    if (!username) {
      return res.status(404).json({ message: "username is required" })
    }

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.purchasedItems = user.purchasedItems.filter(card => card.cardId !== cardId)

    user.availableMoney += quantity * price;

    await user.save();
    return res.status(200).json({
      message: "Item removed successfully",
      removedItem: cardId,
      price: price
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }

}