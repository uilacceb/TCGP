import styles from "./Header.module.css"
import mainIcon from "../../assets/header-icon.png"
import cartImage from "../../assets/carts.png"

const Header = () => {
  const url = "https://i0.wp.com/www.clubit.tv/wp-content/uploads/2017/08/pokemon.jpg"
  return (
    <div className={styles.container}>
      <img src={mainIcon} height={80} />
      <img className={styles.cartImage} src={cartImage} height={40} width={40} />
    </div>

  )
}

export default Header