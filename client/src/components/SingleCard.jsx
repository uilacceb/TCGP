import { useEffect, useState } from "react"
import styles from "./SingleCard.module.css"

const SingleCard = ({ src, name, id, rarity }) => {

  const [pokemonPrice, setPokemonPrice] = useState(0)
  // const api = "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v3.json"

  // useEffect(() => {
  //   const fetchPrice = async () => {
  //     try {
  //       const res = await fetch(api)
  //       const data = await res.json()

  //       // 1. Find the single card in the data with the same 'id' (or name, etc.)


  //       // 2. If found, set the price based on its rarity
  //       if (foundCard) {
  //         switch (foundCard.rarity) {
  //           case "◊":
  //             setPokemonPrice(200)
  //             break
  //           case "◊◊":
  //             setPokemonPrice(500)
  //             break
  //           case "◊◊◊":
  //             setPokemonPrice(1000)
  //             break
  //           case "◊◊◊◊":
  //             setPokemonPrice(2000)
  //             break
  //           case "☆":
  //             setPokemonPrice(3000)
  //             break
  //           case "☆☆":
  //             setPokemonPrice(5000)
  //             break
  //           case "☆☆☆":
  //             setPokemonPrice(8000)
  //             break
  //           case "♕":
  //             setPokemonPrice(10000)
  //             break
  //           default:
  //             setPokemonPrice(100)
  //         }
  //       } else {
  //         // If not found, set a default price
  //         setPokemonPrice(100)
  //       }
  //     } catch (err) {
  //       console.error("Error fetching cards:", err)
  //     }
  //   }
  //   fetchPrice()
  // }, [id])

  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={name ?? `Card-${id}`}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3>{name}</h3>
        {/* Display the dynamic price from state */}
        {/* <p className={styles.price}>Price: {pokemonPrice}</p> */}
        <p className={styles.rarity}>rarity: {rarity}</p>
      </div>
    </div>
  )
}

export default SingleCard
