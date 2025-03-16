import { useEffect, useState } from "react";
import styles from "./CartSingleItem.module.css";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";

const CartSingleItem = ({ price, quantity, productName, src, cardId, onQuantityChange, onRemoveItem }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [singleTotal, setSingleTotal] = useState(price * quantity);
  const [updating, setUpdating] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Update local state when prop changes
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const addQuantity = async () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    updateQuantityOnServer(newQuantity);
  };

  const subQuantity = async () => {
    if (localQuantity <= 1) return;

    const newQuantity = localQuantity - 1;
    setLocalQuantity(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    updateQuantityOnServer(newQuantity);
  };

  const handleInputChange = (e) => {
    let input = e.target.value;
    let numericValue = input.replace(/[^0-9]/g, "");
    const newQuantity = numericValue === "" ? 1 : Number(numericValue);

    setLocalQuantity(newQuantity);

    // Call the function to update parent component
    if (onQuantityChange) {
      onQuantityChange(cardId, newQuantity);
    }

    updateQuantityOnServer(newQuantity);
  };

  // Function to update quantity on server
  const updateQuantityOnServer = async (newQuantity) => {
    if (!username || !token) return;

    try {
      setUpdating(true);

      console.log("Updating server with:", {
        username,
        cardId,
        quantity: newQuantity
      });

      await axios.put(
        "http://localhost:8080/product/cart",
        {
          username,
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

      console.log("Server update successful");
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Revert to previous quantity on error
      setLocalQuantity(quantity);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    setSingleTotal(localQuantity * price);
  }, [localQuantity, price]);

  const handleRemoveItem = async () => {
    if (!token || !username) {
      console.error("Missing token or username");
      return;
    }

    try {
      setUpdating(true);

      const response = await axios.delete("http://localhost:8080/product/cart", {
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
            disabled={localQuantity <= 1 || updating}
          >
            -
          </button>
          <input
            className={styles.quantity}
            type="text"
            min={1}
            value={localQuantity}
            onChange={(e) => handleInputChange(e)}
            disabled={updating}
          />
          <button
            onClick={addQuantity}
            className={styles.minusButton}
            disabled={updating}
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