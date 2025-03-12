import { useEffect, useState } from "react";
import styles from "./CartSingleItem.module.css";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";

const CartSingleItem = ({ price, quantity, productName, src, cardId, onQuantityChange, onRemoveItem }) => {
  const [quantity1, setQuantity1] = useState(quantity);
  const [singleTotal, setSingleTotal] = useState(price * quantity);
  const [updating, setUpdating] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const addQuantity = async () => {


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
    if (!username || !token) return;

    try {
      setUpdating(true);

      // You'll need to implement this endpoint on your server
      await axios.put(
        "http://localhost:8080/product/cart/update",
        {
          username,
          cardId,
          quantity: newQuantity
        },
        {
          headers: {
            Authorization: token
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
  }, [quantity1, price, cardId]);

  const handleRemoveItem = async () => {
    if (!token || !username) {
      console.error("Missing token or username");
      return;
    }

    try {
      setUpdating(true);

      const response = await axios.delete("http://localhost:8080/product/cart/remove", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        data: {
          cardId,
          username
        }
      });

      console.log("Item removed:", response.data);

      // Call the callback function to notify parent component
      if (onRemoveItem) {
        onRemoveItem(cardId);
      }

    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdating(false);
    }
  };


  return (
    <div className={styles.singleItemCard}>
      <div className={styles.deleteIconDiv} onClick={handleRemoveItem}>
        <FaTrashCan className={styles.deleteIcon} color="#FF2B3D" />
      </div>
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
          >
            +
          </button>
        </div>
        <p className={styles.total}>Total: ${singleTotal}</p>
      </div>
    </div>
  );
};

export default CartSingleItem;