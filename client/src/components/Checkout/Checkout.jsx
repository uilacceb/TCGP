import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.module.css";
import CartSingleItem from "./cartSingleItem/CartSingleItem";
import { FaAngleUp } from "react-icons/fa6";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Get user info from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, [username, token]);

  // Function to fetch cart items
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

      const items = response.data.cartItems || [];
      setCartItems(items);

      // Calculate total price
      calculateTotalPrice(items);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items. Please try again.");
      setLoading(false);
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  // Function to handle quantity changes
  const handleQuantityChange = (cardId, newQuantity) => {
    // Update the cart items locally with the new quantity
    const updatedItems = cartItems.map(item => {
      if (item.cardId === cardId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);

    // Recalculate the total price
    calculateTotalPrice(updatedItems);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/product/checkout",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );

      // Clear the cart after successful checkout
      setCartItems([]);
      setTotalPrice(0);

      // You could show success message or redirect
      alert("Checkout successful!");

    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Failed to complete checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && cartItems.length === 0) {
    return <div className={styles.loading}>Loading your cart...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty</div>;
  }

  const handleRemoveItem = (cardId) => {
    // Filter out the removed item
    const updatedItems = cartItems.filter(item => item.cardId !== cardId);
    setCartItems(updatedItems);

    // Recalculate the total price
    calculateTotalPrice(updatedItems);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Your Cart</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <CartSingleItem
              price={item.price}
              quantity={item.quantity}
              productName={item.productName}
              src={item.imageURL}
              cardId={item.cardId}
              stock={item.stock || 10} // Default to 10 if stock not provided
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          className={`${styles.scrollToTop} ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          style={{ display: isVisible ? "block" : "none" }}
          onClick={scrollToTop}
        >
          <FaAngleUp size={50} />
        </button>
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.totalPrice}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Total: </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${totalPrice}</span>
        </div>

        <button
          className={styles.checkoutButton}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;