import A1 from "./assets/cards/A1.json"
import A2 from "./assets/cards/A2.json"
import A1a from "./assets/cards/A1a.json"
import PA from "./assets/cards/P-A.json"

const update = (cards, setName) => {
  return cards.map(card => ({
    ...card,
    id: `${setName}-${card.id}`
  }));
};

export const a1Cards = update(A1, 'A1')
export const a2Cards = update(A2, 'A2')
export const a1aCards = update(A1a, 'A1a')
export const paCards = update(PA, 'P-A')
export const allCardsArray = [...a1Cards, ...a1aCards, ...a2Cards, ...paCards]
