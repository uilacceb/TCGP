import styles from "./SingleCard.module.css"
import AddToCard from "../../assets/add-to-cart.png"
import { useState } from "react"
import axios from "axios"

const SingleCard = ({ src, name, id, onClick, price, cardId, rarity }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");



  const handleInputChange = (e) => {
    let input = e.target.value
    let numericValue = input.replace(/[^0-9]/g, "");
    numericValue == "" ? setQuantity(1) : setQuantity(Number(numericValue))
  }

  const addToCart = async () => {
    try {
      setIsAdding(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Make sure token exists
      if (!token) {
        setMessage("Please log in to add items to cart");
        setTimeout(() => setMessage(""), 3000);
        setIsAdding(false);
        return;
      }

      await axios.post(
        "http://localhost:8080/product/cart",
        {
          cardId,
          productName: name,
          price,
          quantity,
          imageURL: src
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response && error.response.status === 401) {
        setMessage("Please log in again to add to cart");
      } else {
        setMessage("Failed to add to cart. Please try again.");
      }
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsAdding(false);
    }
  }

  const addQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const subQuantity = () => {
    setQuantity(prev => prev - 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageDiv} onClick={onClick}>
        <img
          src={src}
          alt={name ?? `Card-${id}`}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>Price: ${price}</p>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.addDelete}>
          <button onClick={subQuantity} className={styles.plusButton}>-</button>
          <input className={styles.quantity} type="text" min={1}
            value={quantity} onChange={(e) => handleInputChange(e)} />
          <button onClick={addQuantity} className={styles.minusButton}>+</button>
          <div onClick={addToCart} style={{ cursor: 'pointer', position: 'relative' }}>
            <img src={AddToCard} className={styles.addToCart} />
            {isAdding && <span className={styles.loader}></span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCard