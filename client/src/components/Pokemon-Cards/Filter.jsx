import styles from "./PokemonCard.module.css";
export const FilterSeries = ({ src, onClick }) => {
  return (
    <div
      className={styles.seriesIcons}
    >
      <img src={src} onClick={onClick} />
    </div>
  )
}

export const FilterPacks = ({ src, onClick }) => {
  return (
    <div
      className={styles.packIcons}
    >
      <img src={src} onClick={onClick} height={150} />
    </div>
  )
}

export const FilterRarity = ({ src, onClick, num }) => {
  switch (num) {
    case 4:
      return <>
        <div
          className={styles.rarityIcons}
          onClick={onClick}
        >
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
        </div></>
    case 3:
      return <>
        <div
          className={styles.rarityIcons}
          onClick={onClick}
        >
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
        </div></>
    case 2:
      return <>
        <div
          className={styles.rarityIcons}
          onClick={onClick}
        >
          <img src={src} height={40} width={30} />
          <img src={src} height={40} width={30} />
        </div></>
    default:
      return <>
        <div
          className={styles.rarityIcons}
          onClick={onClick}
        >
          <img src={src} height={40} width={30} />
        </div></>
  }




}



