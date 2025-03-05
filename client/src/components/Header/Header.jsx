import styles from "./Header.module.css"
import mainIcon from "../../assets/header-icon.png"
import cartImage from "../../assets/carts.png"
import loginIcon from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
const Header = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img style={{ cursor: "pointer" }} onClick={() => navigate("/")} src={mainIcon} height={80} />
      <div className={styles.loginGroup}>
        <button className={styles.loginButton} onClick={() => navigate("/login")}> <img className={styles.loginIcon} src={loginIcon} height={50} width={70} />Login</button>
      </div>
      <img className={styles.cartImage} src={cartImage} height={50} width={50} />
    </div>

  )
}

export default Header