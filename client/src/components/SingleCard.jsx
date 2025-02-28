import styles from "./SingleCard.module.css"

const SingleCard = ({ src, name, id, rarity }) => {
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

  const price = getPrice(rarity)

  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={name ?? `Card-${id}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p className={styles.price}>Price: ${price}</p>
        <p className={styles.rarity}>Rarity: {rarity}</p>
      </div>
    </div>
  )
}

export default SingleCard
