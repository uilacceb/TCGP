import styles from "./Header.module.css"
import mainIcon from "../../assets/header-icon.png"
import cartImage from "../../assets/carts.png"

const Header = () => {
  return (
    <div className={styles.container}>
      <img src={mainIcon} height={80} />
      <img className={styles.cartImage} src={cartImage} height={40} width={40} />
    </div>

  )
}

export default Header