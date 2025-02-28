const a1Api = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A1.json";
const a1aApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A1a.json";
const a2api = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/A2.json";
const paApi = "https://raw.githubusercontent.com/uilacceb/tcgp-cards/refs/heads/main/P-A.json";

const update = (cards, setName) => {
  return cards.map(card => ({
    ...card,
    id: `${setName}-${card.id}`,
  }));
};

export const fetchAllCards = async () => {
  try {
    // 1) Fetch all four endpoints in parallel:
    const [resA1, resA1a, resA2, resPA] = await Promise.all([
      fetch(a1Api),
      fetch(a1aApi),
      fetch(a2api),
      fetch(paApi),
    ]);

    // 2) Parse each response into JSON:
    const [A1, A1a, A2, PA] = await Promise.all([
      resA1.json(),
      resA1a.json(),
      resA2.json(),
      resPA.json(),
    ]);

    // 3) Add the “set” prefix to each card’s ID:
    const a1Cards = update(A1, "A1");
    const a1aCards = update(A1a, "A1a");
    const a2Cards = update(A2, "A2");
    const paCards = update(PA, "P-A");

    // 4) Return as one JSON object with multiple fields:
    return {
      A1: a1Cards,
      A1a: a1aCards,
      A2: a2Cards,
      PA: paCards,
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    // Return an empty object or handle error as needed
    return {};
  }
};
