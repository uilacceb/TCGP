import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.module.css";
import CartSingleItem from "./cartSingleItem/cartSingleItem";
import { FaAngleUp } from "react-icons/fa6";
// import CartSingleItem from "./cartSingleItem/CartSingleItem"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(true)

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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


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
        {
          cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <CartSingleItem price={item.price} quantity={item.quantity} productName={item.productName} src={item.imageURL} />
            </div>
          ))
        }
      </div>
      <div >
        <button
          className={`${styles.scrollToTop} ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          style={{ display: isVisible ? "block" : "none", }}
          onClick={scrollToTop}><FaAngleUp size={50} /></button>
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