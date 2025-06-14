const a1Api = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A1.json";
const a1aApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A1a.json";
const a2Api = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A2.json";
const paApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/P-A.json";
const a2aApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A2a.json"
const a2bApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A2b.json"
const a3Api = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A3.json"
const a3aApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A3a.json"

const update = (cards, setName) => {
  return cards.map(card => ({
    ...card,
    id: `${setName}-${card.id}`,
  }));
};

export const fetchAllCards = async () => {
  try {
    // 1) Fetch all four endpoints in parallel:
    const [resA1, resA1a, resA2, resPA, resA2a, resA2b, resA3, resA3a] = await Promise.all([
      fetch(a1Api),
      fetch(a1aApi),
      fetch(a2Api),
      fetch(paApi),
      fetch(a2aApi),
      fetch(a2bApi),
      fetch(a3Api),
      fetch(a3aApi)
    ]);

    // 2) Parse each response into JSON:
    const [A1, A1a, A2, PA, A2a, A2b, A3, A3a] = await Promise.all([
      resA1.json(),
      resA1a.json(),
      resA2.json(),
      resPA.json(),
      resA2a.json(),
      resA2b.json(),
      resA3.json(),
      resA3a.json()
    ]);

    // 3) Add the “set” prefix to each card’s ID:
    const a1Cards = update(A1, "A1");
    const a1aCards = update(A1a, "A1a");
    const a2Cards = update(A2, "A2");
    const paCards = update(PA, "P-A");
    const a2aCards = update(A2a, "A2a")
    const a2bCards = update(A2b, "A2b")
    const a3Cards = update(A3, "A3")
    const a3aCards = update(A3a, "A3a")

    // 4) Return as one JSON object with multiple fields:
    return {
      A1: a1Cards,
      A1a: a1aCards,
      A2: a2Cards,
      PA: paCards,
      A2a: a2aCards,
      A2b: a2bCards,
      A3: a3Cards,
      A3a: a3aCards
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    // Return an empty object or handle error as needed
    return {};
  }
};
