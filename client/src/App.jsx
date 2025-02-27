import { useState } from "react";

function App() {
  // Store the entire array of data in state (use an empty array as default).
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v3.json"
      )
      const data = await res.json();

      setCards(data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  return (
    <div>
      <button onClick={fetchCards}>Fetch Cards</button>
      <div>
        {cards.map((card, index) => (
          <img
            key={index}
            src={card.image}
            alt={card.name ?? `Card-${index}`}
            style={{ width: 200, marginRight: 10 }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
