import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.css"
import SingleCard from "./SingleCard";
import { fetchAllCards } from "../pokemonDB";


const PokemonCard = () => {
  // Store the entire array of data in state (use an empty array as default).
  const [cards, setCards] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(0)


  useEffect(() => {
    // Create an IIFE (Immediately Invoked Function Expression) so we can use async/await inside useEffect
    (async () => {
      try {
        // fetchAllCards returns an object like { A1: [...], A1a: [...], A2: [...], PA: [...] }
        const data = await fetchAllCards();
        // If you want all cards in one array, just combine them:
        const combined = [
          ...data.A1,
          ...data.A1a,
          ...data.A2,
          ...data.PA
        ];
        setCards(combined);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    })();
  }, [toggleRefresh]);


  const filterRarityCard = async (filterValue) => {
    try {
      const data = await fetchAllCards();
      const combined = [
        ...data.A1,
        ...data.A1a,
        ...data.A2,
        ...data.PA
      ];

      const filtered = combined.filter(
        (card) => card.rarity === filterValue
      );
      setCards(filtered);

    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  // 1) Single helper function to fetch + filter by a “set_details” value
  const fetchAndFilterSet = async (filterValue) => {
    try {
      const data = await fetchAllCards();
      const combined = [
        ...data.A1,
        ...data.A1a,
        ...data.A2,
        ...data.PA
      ];

      const filtered = combined.filter(
        (card) => card.set_details === filterValue
      );
      setCards(filtered);

    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  const fetchAndFilterPack = async (filterValue) => {
    try {
      const data = await fetchAllCards();
      const combined = [
        ...data.A1,
        ...data.A1a,
        ...data.A2,
        ...data.PA
      ];

      const filtered = combined.filter(
        (card) => card.pack === filterValue
      );
      setCards(filtered);

    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  // 2) Then each button handler becomes a simple one-line call:
  const filterSetA1 = () => {
    fetchAndFilterSet("Genetic Apex  (A1)");
  };

  const filterSetA1a = () => {
    fetchAndFilterSet("Mythical Island  (A1a)");
  };

  const filterSetA2 = () => {
    fetchAndFilterSet("Space-Time Smackdown  (A2)");
  };

  const filterSetPA = () => {
    fetchAndFilterSet("Promo-A");
  };

  const filterPackMewTwo = () => {
    fetchAndFilterPack("Mewtwo pack")
  }
  const filterPackCharizard = () => {
    fetchAndFilterPack("Charizard pack")
  }
  const filterPackPikachu = () => {
    fetchAndFilterPack("Pikachu pack")
  }
  const filterPackDialga = () => {
    fetchAndFilterPack("Dialga pack")
  }
  const filterPackPalika = () => {
    fetchAndFilterPack("Palkia pack")
  }
  const filterPackMythical = () => {
    fetchAndFilterPack("Mew pack")
  }
  const filterEveryPack = () => {
    fetchAndFilterPack("Every pack")
  }
  const filterThreeStarPack = () => {
    filterRarityCard("☆☆☆")
  }
  const filterTwoStarPack = () => {
    filterRarityCard("☆☆")
  }
  const filterOneStarPack = () => {
    filterRarityCard("☆")
  }
  const filterFourDiamondPack = () => {
    filterRarityCard("◊◊◊◊")
  }
  const filterThreeDiamondPack = () => {
    filterRarityCard("◊◊◊")
  }
  const filterTwoDiamondPack = () => {
    filterRarityCard("◊◊")
  }
  const filterOneDiamondPack = () => {
    filterRarityCard("◊")
  }
  const filterCrownPack = () => {
    filterRarityCard("Crown Rare")
  }

  return (
    <div className={styles.main_div} >
      <button onClick={filterCrownPack}>♛ Cards</button>
      <button onClick={filterThreeStarPack}>☆☆☆ Cards</button>
      <button onClick={filterTwoStarPack}>☆☆ Cards</button>
      <button onClick={filterOneStarPack}>☆ Cards</button>
      <button onClick={filterFourDiamondPack}>◊◊◊◊ Cards</button>
      <button onClick={filterThreeDiamondPack}>◊◊◊ Cards</button>
      <button onClick={filterTwoDiamondPack}>◊◊ Cards</button>
      <button onClick={filterOneDiamondPack}>◊ Cards</button>
      <button onClick={filterSetA1}>A1</button>
      <button onClick={filterSetA1a}>A1a</button>
      <button onClick={filterSetA2}>A2</button>
      <button onClick={filterSetPA}>PA</button>
      <button onClick={filterPackMewTwo}>MewTwo</button>
      <button onClick={filterPackCharizard}>Charizard</button>
      <button onClick={filterPackPikachu}>Pikachu</button>
      <button onClick={filterPackDialga}>Dialga</button>
      <button onClick={filterPackPalika}>Palika</button>
      <button onClick={filterPackMythical}>Mythical Island</button>
      <button onClick={filterEveryPack}>Every Pack</button>
      <button onClick={() => setToggleRefresh(prev => prev + 1)}>refresh</button>
      <div className={styles.container} >
        {cards.map((card, index) => (
          <SingleCard key={index} src={card.image} id={card.id} name={card.name} rarity={card.rarity} type={card.attacks[0]?.cost[0]} />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard