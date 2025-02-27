import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.css"
import SingleCard from "./SingleCard";


const PokemonCard = () => {
  // Store the entire array of data in state (use an empty array as default).
  const [cards, setCards] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(0)
  const api = "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v3.json"


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(api)
        const data = await res.json();
        console.log(data[0].rarity)
        setCards(data);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };
    fetchCards();
  }, [toggleRefresh])


  const filterCard = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      const filtered = data.filter((card) => card.rarity === "◊◊◊");
      setCards(filtered);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  return (
    <div >
      <button onClick={filterCard}>Fetch Cards</button>
      <button onClick={() => setToggleRefresh(prev => prev + 1)}>refresh</button>
      <div className={styles.container} >
        {cards.map((card, index) => (
          <SingleCard key={index} src={card.image} id={card.id} name={card.name} rarity={card.rarity} />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard