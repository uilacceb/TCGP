import { useEffect, useState } from "react";
import styles from "./CartSingleItem.module.css";
import axios from "axios";

const CartSingleItem = ({ price, quantity, productName, src, stock, cardId, onQuantityChange }) => {
  const [quantity1, setQuantity1] = useState(quantity);
  const [singleTotal, setSingleTotal] = useState(price * quantity);
  const [updating, setUpdating] = useState(false);

  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  const addQuantity = async () => {
    if (quantity1 === stock) return;

    const newQuantity = quantity1 + 1;
    setQuantity1(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    // Optional: Update on server
    updateQuantityOnServer(newQuantity);
  };

  const subQuantity = async () => {
    if (quantity1 <= 1) return;

    const newQuantity = quantity1 - 1;
    setQuantity1(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    // Optional: Update on server
    updateQuantityOnServer(newQuantity);
  };

  const handleInputChange = (e) => {
    let input = e.target.value;
    let numericValue = input.replace(/[^0-9]/g, "");
    const newQuantity = numericValue === "" ? 1 : Number(numericValue);

    setQuantity1(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    // Optional: Update on server (you might want to add debounce here)
    updateQuantityOnServer(newQuantity);
  };

  // Optional: Function to update quantity on server
  const updateQuantityOnServer = async (newQuantity) => {
    if (!userID || !token) return;

    try {
      setUpdating(true);

      // You'll need to implement this endpoint on your server
      await axios.put(
        "http://localhost:8080/product/cart/update",
        {
          userID,
          cardId,
          quantity: newQuantity
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      // You might want to revert the quantity change on error
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    setSingleTotal(quantity1 * price);
  }, [quantity1, price]);

  return (
    <div className={styles.singleItemCard}>
      <div className={styles.itemImageDiv}>
        <img src={src} className={styles.itemImage} alt={productName} />
      </div>
      <div className={styles.itemDetails}>
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
        <div className={styles.addDelete}>
          <button
            onClick={subQuantity}
            className={styles.plusButton}
            disabled={quantity1 <= 1 || updating}
          >
            -
          </button>
          <input
            className={styles.quantity}
            type="text"
            min={1}
            value={quantity1}
            onChange={(e) => handleInputChange(e)}
            disabled={updating}
          />
          <button
            onClick={addQuantity}
            className={styles.minusButton}
            disabled={quantity1 >= stock || updating}
          >
            +
          </button>
        </div>
        <p>Total: ${singleTotal}</p>
      </div>
    </div>
  );
};

export default CartSingleItem;