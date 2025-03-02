import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.css";
import SingleCard from "../Single-Card/SingleCard";
import { fetchAllCards } from "../../pokemonDB";
import MythIslandURL from "../../assets/Mythical-Island.png";
import rarityStar from "../../assets/rarity star.webp";
import rarityDiamond from "../../assets/rarity diamond.webp";
import rarityCrown from "../../assets/rarity crown.webp";
import CharizardPackURL from "../../assets/genetic-apex-charizard.webp";
import PikachuPackURL from "../../assets/genetic-apex-pikachu.webp";
import MewTwoPackURL from "../../assets/genetic-apex-mewtwo.webp";
import promoA from "../../assets/promoA.webp";
import genericApexSerie from "../../assets/genetic apex series.webp";
import smackDownSeries from "../../assets/space time smack down series.webp";
import mythicalIslandSeries from "../../assets/mythical island series.webp";
import triumphantSeries from "../../assets/triumphant light.png";
import TriumphantLightPackURL from "../../assets/Triumphant Light Pack.png";
import EveryPack from "../../assets/boosterPack.png";

const PokemonCard = () => {
  // Store the entire array of data in state (use an empty array as default).
  const [cards, setCards] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all"); // Track active filter for UI feedback

  const pakiyaPackURL = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-tcg-pocket/7/7b/Pokemon_TCG_Pocket_Space-Time_Smackdown_Booster_Pack_Palkia2.png?width=960";
  const dialgaPackURL = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-tcg-pocket/5/56/Pokemon_TCG_Pocket_Space-Time_Smackdown_Booster_Pack_Dialga1.png?width=2240";

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
          ...data.PA,
          ...data.A2a
        ];
        setCards(combined);
        setActiveFilter("all");
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
        ...data.PA,
        ...data.A2a
      ];

      const filtered = combined.filter(
        (card) => card.rarity === filterValue
      );
      setCards(filtered);
      setActiveFilter(`rarity-${filterValue}`);
    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  // 1) Single helper function to fetch + filter by a "set_details" value
  const fetchAndFilterSet = async (filterValue) => {
    try {
      const data = await fetchAllCards();
      const combined = [
        ...data.A1,
        ...data.A1a,
        ...data.A2,
        ...data.PA,
        ...data.A2a
      ];

      const filtered = combined.filter(
        (card) => card.set_details === filterValue
      );
      setCards(filtered);
      setActiveFilter(`set-${filterValue}`);
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
        ...data.PA,
        ...data.A2a
      ];

      const filtered = combined.filter(
        (card) => card.pack === filterValue
      );
      setCards(filtered);
      setActiveFilter(`pack-${filterValue}`);
    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  // --- Buttons for filtering sets ---
  const filterSetA1 = () => fetchAndFilterSet("Genetic Apex  (A1)");
  const filterSetA1a = () => fetchAndFilterSet("Mythical Island  (A1a)");
  const filterSetA2 = () => fetchAndFilterSet("Space-Time Smackdown  (A2)");
  const filterSetPA = () => fetchAndFilterSet("Promo-A");
  const filterSetA2a = () => fetchAndFilterSet("Triumphant Light  (A2a)");

  // --- Buttons for filtering packs ---
  const filterPackMewTwo = () => fetchAndFilterPack("Mewtwo pack");
  const filterPackCharizard = () => fetchAndFilterPack("Charizard pack");
  const filterPackPikachu = () => fetchAndFilterPack("Pikachu pack");
  const filterPackDialga = () => fetchAndFilterPack("Dialga pack");
  const filterPackPalkia = () => fetchAndFilterPack("Palkia pack");
  const filterPackMythical = () => fetchAndFilterPack("Mew pack");
  const filterPackTriumphantLight = () => fetchAndFilterPack("Arceus pack");
  const filterEveryPack = () => fetchAndFilterPack("Every pack");

  // --- Buttons for filtering rarities ---
  const filterThreeStarPack = () => filterRarityCard("☆☆☆");
  const filterTwoStarPack = () => filterRarityCard("☆☆");
  const filterOneStarPack = () => filterRarityCard("☆");
  const filterFourDiamondPack = () => filterRarityCard("◊◊◊◊");
  const filterThreeDiamondPack = () => filterRarityCard("◊◊◊");
  const filterTwoDiamondPack = () => filterRarityCard("◊◊");
  const filterOneDiamondPack = () => filterRarityCard("◊");
  const filterCrownPack = () => filterRarityCard("Crown Rare");

  const handleRefresh = () => {
    setToggleRefresh(prev => prev + 1);
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.filterButtons}>
        {/* filter rarity */}
        <div className={styles.filterRarity}>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-Crown Rare" ? styles.activeFilter : ""}`} 
            onClick={filterCrownPack}
          >
            <img src={rarityCrown} height={30} width={40} alt="Crown Rarity" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-☆☆☆" ? styles.activeFilter : ""}`}
            onClick={filterThreeStarPack}
          >
            <img src={rarityStar} height={30} width={30} alt="Star" />
            <img src={rarityStar} height={30} width={30} alt="Star" />
            <img src={rarityStar} height={30} width={30} alt="Star" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-☆☆" ? styles.activeFilter : ""}`}
            onClick={filterTwoStarPack}
          >
            <img src={rarityStar} height={30} width={30} alt="Star" />
            <img src={rarityStar} height={30} width={30} alt="Star" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-☆" ? styles.activeFilter : ""}`}
            onClick={filterOneStarPack}
          >
            <img src={rarityStar} height={30} width={30} alt="Star" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-◊◊◊◊" ? styles.activeFilter : ""}`}
            onClick={filterFourDiamondPack}
          >
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-◊◊◊" ? styles.activeFilter : ""}`}
            onClick={filterThreeDiamondPack}
          >
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-◊◊" ? styles.activeFilter : ""}`}
            onClick={filterTwoDiamondPack}
          >
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
          </div>
          <div 
            className={`${styles.rarityIcons} ${activeFilter === "rarity-◊" ? styles.activeFilter : ""}`}
            onClick={filterOneDiamondPack}
          >
            <img src={rarityDiamond} height={30} width={20} alt="Diamond" />
          </div>
        </div>

        {/* filter series */}
        <div className={styles.filterSeries}>
          <div 
            className={`${styles.seriesIcons} ${activeFilter === "set-Genetic Apex  (A1)" ? styles.activeFilter : ""}`}
          >
            <img src={genericApexSerie} onClick={filterSetA1} alt="Genetic Apex Series" />
          </div>
          <div 
            className={`${styles.seriesIcons} ${activeFilter === "set-Mythical Island  (A1a)" ? styles.activeFilter : ""}`}
          >
            <img src={mythicalIslandSeries} onClick={filterSetA1a} alt="Mythical Island Series" />
          </div>
          <div 
            className={`${styles.seriesIcons} ${activeFilter === "set-Space-Time Smackdown  (A2)" ? styles.activeFilter : ""}`}
          >
            <img src={smackDownSeries} onClick={filterSetA2} alt="Space-Time Smackdown Series" />
          </div>
          <div 
            className={`${styles.seriesIcons} ${activeFilter === "set-Triumphant Light  (A2a)" ? styles.activeFilter : ""}`}
          >
            <img src={triumphantSeries} onClick={filterSetA2a} width={230} alt="Triumphant Light Series" />
          </div>
          <div 
            className={`${styles.seriesIcons} ${activeFilter === "set-Promo-A" ? styles.activeFilter : ""}`}
          >
            <img onClick={filterSetPA} src={promoA} alt="Promo-A pack" />
          </div>
        </div>

        {/* filter packs */}
        <div className={styles.filterPacks}>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Mewtwo pack" ? styles.activeFilter : ""}`}
          >
            <img src={MewTwoPackURL} onClick={filterPackMewTwo} height={150} alt="MewTwo Pack" />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Charizard pack" ? styles.activeFilter : ""}`}
          >
            <img src={CharizardPackURL} onClick={filterPackCharizard} height={150} alt="Charizard Pack" />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Pikachu pack" ? styles.activeFilter : ""}`}
          >
            <img onClick={filterPackPikachu} alt="Pikachu Pack" src={PikachuPackURL} height={150} />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Dialga pack" ? styles.activeFilter : ""}`}
          >
            <img onClick={filterPackDialga} alt="Dialga Pack" src={dialgaPackURL} height={150} />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Palkia pack" ? styles.activeFilter : ""}`}
          >
            <img onClick={filterPackPalkia} alt="Palika Pack" src={pakiyaPackURL} height={150} />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Arceus pack" ? styles.activeFilter : ""}`}
          >
            <img onClick={filterPackTriumphantLight} alt="Triumphant Light Pack" src={TriumphantLightPackURL} height={150} />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Mew pack" ? styles.activeFilter : ""}`}
          >
            <img src={MythIslandURL} onClick={filterPackMythical} height={150} alt="Mew Pack" />
          </div>
          <div 
            className={`${styles.packIcons} ${activeFilter === "pack-Every pack" ? styles.activeFilter : ""}`}
          >
            <img src={EveryPack} alt="every pack" onClick={filterEveryPack} height={150} />
          </div>
          <button 
            className={styles.refreshButton} 
            onClick={handleRefresh}
          >
            Refresh Cards
          </button>
        </div>
      </div>

      {/* Show loading state or empty state */}
      {cards.length === 0 && (
        <div className={styles.emptyState}>
          <p>No cards found. Try another filter or refresh.</p>
        </div>
      )}

      <div className={styles.container}>
        {cards.map((card, index) => (
          <SingleCard 
            key={index} 
            src={card.image} 
            id={card.id} 
            name={card.name} 
            rarity={card.rarity} 
            type={card.attacks[0]?.cost[0]} 
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;