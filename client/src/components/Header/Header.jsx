import styles from "./Header.module.css"
import cartIcon from "../../assets/carts.png"

const Header = () => {
  return (
    <div className={styles.container}>
      <img className={styles.cartImage} src={cartIcon} height={40} width={40} />
    </div>

  )
}

export default Header