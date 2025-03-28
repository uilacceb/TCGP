import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.css";
import SingleCard from "../Single-Card/SingleCard";
import { fetchAllCards } from "../../pokemonDB";
import MythIslandURL from "../../assets/Mythical-Island.png";
// import rarityShining from "../../assets/rarity shiny.webp"
import rarityStar from "../../assets/rarity star.webp";
import rarityDiamond from "../../assets/rarity diamond.webp";
import rarityCrown from "../../assets/rarity crown.webp";
import CharizardPackURL from "../../assets/genetic-apex-charizard.webp";
import PikachuPackURL from "../../assets/genetic-apex-pikachu.webp";
import MewTwoPackURL from "../../assets/genetic-apex-mewtwo.webp";
import promoA from "../../assets/promoA.webp";
import genericApexSerie from "../../assets/genetic apex series.webp";
import smackDownSeries from "../../assets/space time smack down series.webp";
import pakiyaPackURL from "../../assets/palkia-booster.webp"
import dialgaPackURL from "../../assets/dialga-booster.webp"
import mythicalIslandSeries from "../../assets/mythical island series.webp";
import triumphantSeries from "../../assets/triumphant light.png";
import ShiningSeries from "../../assets/shining set.webp"
import TriumphantLightPackURL from "../../assets/Triumphant Light Pack.png";
import EveryPack from "../../assets/boosterPack.png";
import shiningPackURL from "../../assets/shining-revelry.webp"
import { FaAngleUp } from "react-icons/fa6";
import ProductModel from "../../ProductModel";
import { FilterPacks, FilterRarity, FilterSeries } from "./Filter";

const PokemonCard = () => {
  // Store the entire array of data in state (use an empty array as default).
  const [cards, setCards] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(0);
  const [isVisible, setIsVisible] = useState(true) //scroll to top trigger
  const [selectedImage, setSelectedImage] = useState(null); //detail pages
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Create an IIFE (Immediately Invoked Function Expression) so we can use async/await inside useEffect
    (async () => {
      try {
        // fetchAllCards returns an object like { A1: [...], A1a: [...], A2: [...], PA: [...] }
        setIsLoading(true)
        const data = await fetchAllCards();

        //combine all cards in an array
        const combined = [
          ...data.A1,
          ...data.A1a,
          ...data.A2,
          ...data.PA,
          ...data.A2a
        ].map(card => new ProductModel(card));
        setCards(combined);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setIsLoading(false)
      }
    })
      ();
  }, [toggleRefresh]);

  //toggle scroll to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  const filterRarityCard = async (filterValue) => {
    try {
      const data = await fetchAllCards();
      const combined = [
        ...data.A1,
        ...data.A1a,
        ...data.A2,
        ...data.PA,
        ...data.A2a,
        ...data.A2b
      ];

      const filtered = combined.map(card => new ProductModel(card)).filter(
        (card) => card.rarity === filterValue
      );
      setCards(filtered);
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
        ...data.A2a,
        ...data.A2b
      ];

      const filtered = combined.map(card => new ProductModel(card)).filter(
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
        ...data.PA,
        ...data.A2a,
        ...data.A2b
      ];

      const filtered = combined.map(card => new ProductModel(card)).filter(
        (card) => card.pack === filterValue
      );
      setCards(filtered);
    } catch (error) {
      console.error("Error fetching or filtering data:", error);
    }
  };

  // --- Buttons for filtering sets ---
  const filterSetA1 = () => fetchAndFilterSet("Genetic Apex  (A1)");
  const filterSetA1a = () => fetchAndFilterSet("Mythical Island  (A1a)");
  const filterSetA2 = () => fetchAndFilterSet("Space-Time Smackdown  (A2)");
  const filterSetPA = () => fetchAndFilterSet("promo-a");
  const filterSetA2a = () => fetchAndFilterSet("Triumphant Light  (A2a)");
  const filterSetA2b = () => fetchAndFilterSet("shiningrevelry(a2b)")

  // --- Buttons for filtering packs ---
  const filterPackMewTwo = () => fetchAndFilterPack("Mewtwo pack");
  const filterPackCharizard = () => fetchAndFilterPack("Charizard pack");
  const filterPackPikachu = () => fetchAndFilterPack("Pikachu pack");
  const filterPackDialga = () => fetchAndFilterPack("Dialga pack");
  const filterPackPalkia = () => fetchAndFilterPack("Palkia pack");
  const filterPackMythical = () => fetchAndFilterPack("Mew pack");
  const filterPackTriumphantLight = () => fetchAndFilterPack("Arceus pack");

  // --- Buttons for filtering rarities ---
  const filterThreeStarPack = () => filterRarityCard("☆☆☆");
  const filterTwoStarPack = () => filterRarityCard("☆☆");
  const filterOneStarPack = () => filterRarityCard("☆");
  const filterFourDiamondPack = () => filterRarityCard("◊◊◊◊");
  const filterThreeDiamondPack = () => filterRarityCard("◊◊◊");
  const filterTwoDiamondPack = () => filterRarityCard("◊◊");
  const filterOneDiamondPack = () => filterRarityCard("◊");
  const filterCrownPack = () => filterRarityCard("Crown Rare");
  // const filterShiningPack = () => filterRarityCard("Unknown")

  const handleRefresh = () => {
    setToggleRefresh(prev => prev + 1);
  };

  const showDetail = (card) => {
    setSelectedImage(card);
  }

  const getRarity = (rarity) => {
    switch (rarity) {
      case "◊":
        return <img src={rarityDiamond} />
      case "◊◊":
        return <><img src={rarityDiamond} /><img src={rarityDiamond} /></>
      case "◊◊◊":
        return <><img src={rarityDiamond} /><img src={rarityDiamond} /><img src={rarityDiamond} /></>
      case "◊◊◊◊":
        return <><img src={rarityDiamond} /><img src={rarityDiamond} /><img src={rarityDiamond} /><img src={rarityDiamond} /></>
      case "☆":
        return <img src={rarityStar} />
      case "☆☆":
        return <><img src={rarityStar} /><img src={rarityStar} /></>
      case "☆☆☆":
        return <><img src={rarityStar} /><img src={rarityStar} /><img src={rarityStar} /></>
      case "Crown Rare":
        return <img src={rarityCrown} />
      case "":
        return "N/A"
      default:
        return "N/A"
    }
  }



  return (
    <div className={styles.main_div}>
      <div className={styles.filterButtons}>
        {/* filter rarity */}
        <div className={styles.filterRarity}>
          <FilterRarity src={rarityCrown} onClick={filterCrownPack} num={1} />
          <FilterRarity src={rarityStar} onClick={filterThreeStarPack} num={3} />
          <FilterRarity src={rarityStar} onClick={filterTwoStarPack} num={2} />
          <FilterRarity src={rarityStar} onClick={filterOneStarPack} num={1} />
          <FilterRarity src={rarityDiamond} onClick={filterFourDiamondPack} num={4} />
          <FilterRarity src={rarityDiamond} onClick={filterThreeDiamondPack} num={3} />
          <FilterRarity src={rarityDiamond} onClick={filterTwoDiamondPack} num={2} />
          <FilterRarity src={rarityDiamond} onClick={filterOneDiamondPack} num={1} />

        </div>

        {/* filter series */}
        <div className={styles.filterSeries}>
          <FilterSeries src={genericApexSerie} onClick={filterSetA1} />
          <FilterSeries src={mythicalIslandSeries} onClick={filterSetA1a} />
          <FilterSeries src={smackDownSeries} onClick={filterSetA2} />
          <FilterSeries src={triumphantSeries} onClick={filterSetA2a} />
          <FilterSeries src={ShiningSeries} onClick={filterSetA2b} />
          <FilterSeries src={promoA} onClick={filterSetPA} />
        </div>

        {/* filter packs */}
        <div className={styles.filterPacks}>
          <FilterPacks src={MewTwoPackURL} onClick={filterPackMewTwo} />
          <FilterPacks src={CharizardPackURL} onClick={filterPackCharizard} />
          <FilterPacks src={PikachuPackURL} onClick={filterPackPikachu} />
          <FilterPacks src={MythIslandURL} onClick={filterPackMythical} />
          <FilterPacks src={dialgaPackURL} onClick={filterPackDialga} />
          <FilterPacks src={pakiyaPackURL} onClick={filterPackPalkia} />
          <FilterPacks src={TriumphantLightPackURL} onClick={filterPackTriumphantLight} />
          <FilterPacks src={shiningPackURL} onClick={filterSetA2b} />
          <FilterPacks src={EveryPack} onClick={handleRefresh} />
        </div>
      </div>

      {isLoading ? (<div className={styles.loadingState}><p>Fetching pokemon...</p></div>) : <div className={styles.container}>
        {cards.map((card, index) => (
          <SingleCard
            key={index}
            src={card.imageURL}
            id={index}
            cardId={card.cardId}
            name={card.productName}
            rarity={card.rarity}
            price={card.price}
            onClick={() => showDetail(card)}
          />
        ))}
      </div>}

      <div >
        <button
          className={`${styles.scrollToTop} ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          style={{ display: isVisible ? "block" : "none", }}
          onClick={scrollToTop}><FaAngleUp size={50} /></button>
      </div>
      {selectedImage && (
        <div className={styles.selectedCardModal}>
          <div className={styles.modalContent}>
            <img
              src={selectedImage.imageURL}
              alt={selectedImage.name}
              className={styles.selectedCardImage}
            />
            <div className={styles.cardDetails}>
              <h2>{selectedImage.productName}</h2>
              <p>HP: <strong>{selectedImage.hp === 0 ? "N/A" : selectedImage.hp}</strong></p>
              <p>ID: <strong>{selectedImage.cardId}</strong></p>
              <p>Pack: <strong>{selectedImage.pack.split(" ")[0]}</strong></p>
              <p>Rarity: <strong>{getRarity(selectedImage.rarity)}</strong></p>
            </div>
            <button onClick={() => setSelectedImage(null)} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

    </div >
  );
};

export default PokemonCard;