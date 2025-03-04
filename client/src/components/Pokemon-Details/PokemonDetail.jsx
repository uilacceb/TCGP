import { useState } from "react"
import styles from "./pokemonDetails.module.css"

const PokemonDetail = ({ src, name, id, rarity, type }) => {
  const [pokemon, setPokemon] = useState(null)

  const testApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A1.json"

  const fetchPokemon = async () => {
    try {
      const res = await fetch(testApi)
      const data = await res.json()
      setPokemon(data)
      console.log(data)
    } catch (error) {
      console.error("Error fetching Pokemon:", error)
    }
  }

  

  return (
    <>
      <div className={styles.detailContainer}>
        <button className={styles.button} onClick={fetchPokemon}>fetch pokemon</button>
        {pokemon ? (
          <img src={src} alt="Pokemon" />
        ) : (
          <p>Click the button to fetch a Pokemon</p>
        )}
      </div>
    </>
  )
}

export default PokemonDetail