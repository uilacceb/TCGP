import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Get userID from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!username || !token) {
        setError("Please log in to view your cart");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/product/cart/${username}`, {
          headers: {
            Authorization: token
          }
        });

        setCartItems(response.data.cartItems || []);

        // Calculate total price
        const total = (response.data.cartItems || []).reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        setTotalPrice(total);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [username, token]);

  // const handleQuantityChange = async (item, newQuantity) => {
  //   // Placeholder for updating quantity
  //   // You can implement this feature later
  // };

  // const handleRemoveItem = async (cardId) => {
  //   // Placeholder for removing item
  //   // You can implement this feature later
  // };

  // const handleCheckout = async () => {
  //   // Placeholder for checkout process
  //   // You can implement this feature later
  // };

  if (loading) {
    return <div className={styles.loading}>Loading your cart...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.imageURL} alt={item.productName} />
            </div>
            <div className={styles.itemDetails}>
              <h3>{item.productName}</h3>
              <p>Price: ${item.price}</p>
              {/* <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                  +
                </button>
              </div> */}
              <p>Total: ${item.price * item.quantity}</p>
              {/* <button
                className={styles.removeButton}
                onClick={() => handleRemoveItem(item.cardId)}
              >
                Remove
              </button> */}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <h2>Order Summary</h2>
        <div className={styles.summaryRow}>
          <span>Subtotal:</span>
          <span>${totalPrice}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        <button
          className={styles.checkoutButton}
        // onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;