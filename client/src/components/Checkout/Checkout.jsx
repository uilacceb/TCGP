import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.module.css";
import CartSingleItem from "./cartSingleItem/CartSingleItem";
import { FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);


  // Get user info from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await axios.get(`${API_URL}/product/cart`, {
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

  //scroll to top useEffect
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
    if (!username || !token) {
      setError("Please log in to checkout");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/product/checkout`,
        { username },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );

      // Clear the local cart state
      setCartItems([]);
      setTotalPrice(0);

      // Show success message
      alert("Checkout successful!");
      navigate("/userInfo")

    } catch (error) {
      console.error("Error during checkout:", error);

      if (error.response && error.response.status === 400 && error.response.data.message === "Insufficient funds") {
        setError(`Insufficient funds. You need $${error.response.data.required} but have $${error.response.data.available}.`);
      } else if (error.response) {
        setError(error.response.data.message || "Failed to complete checkout. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh the cart
  const handleRefreshCart = () => {
    // Clear any errors
    setError("");
    // Fetch cart items again
    fetchCartItems();
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <p className={styles.loading}>Loading your cart...</p>
        <button
          className={styles.returnButton}
          onClick={handleRefreshCart}
        >
          Refresh Cart
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.checkoutContainer}>
        <p className={styles.error}>{error}</p>
        <button
          className={styles.returnButton}
          onClick={handleRefreshCart}
        >
          Refresh Cart
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <p className={styles.emptyCart}>Your cart is empty</p>
        <button
          className={styles.returnButton}
          onClick={() => navigate("/pokemonCards")}
        >
          Shop Cards
        </button>
      </div>
    );
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