import styles from "./SingleCard.module.css"
import AddToCard from "../../assets/add-to-cart.png"
import { useState } from "react"

const SingleCard = ({ src, name, id, onClick, price, stock }) => {
  const [quantity, setQuantity] = useState(1);


  const handleInputChange = (e) => {
    let input = e.target.value
    let numericValue = input.replace(/[^0-9]/g, "");
    numericValue == "" ? setQuantity(1) : setQuantity(Number(numericValue))
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
        <p className={styles.stock}>Stock: {stock}</p>
        {/* <p className={styles.rarity}>Rarity: {rarity}</p>
        <p className={styles.type}>Type: {type}</p> */}
        <div className={styles.addDelete}>
          <button onClick={subQuantity} className={styles.plusButton}>-</button>
          <input className={styles.quantity} type="text" min={1}
            value={quantity} onChange={(e) => handleInputChange(e)} />
          <button onClick={addQuantity} className={styles.minusButton}>+</button>
          <img src={AddToCard} className={styles.addToCart}></img>
        </div>
      </div>
    </div>
  )
}

export default SingleCard
