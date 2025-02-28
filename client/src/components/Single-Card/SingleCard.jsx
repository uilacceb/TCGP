import styles from "./SingleCard.module.css"
import AddToCard from "../../assets/add-to-cart.png"
import { useState } from "react"

const SingleCard = ({ src, name, id, rarity, type }) => {
  const [quantity, setQuantity] = useState(1);

  const getPrice = (rarity) => {
    switch (rarity) {
      case "◊":
        return 200
      case "◊◊":
        return 500
      case "◊◊◊":
        return 1000
      case "◊◊◊◊":
        return 2000
      case "☆":
        return 3000
      case "☆☆":
        return 5000
      case "☆☆☆":
        return 8000
      case "♕":
        return 10000
      case "":
        return 100
      default:
        return 100
    }
  }
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

  const price = getPrice(rarity)

  return (
    <div className={styles.container}>
      <div className={styles.imageDiv}>
        <img
          src={src}
          alt={name ?? `Card-${id}`}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>

        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>Price: ${price}</p>
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
