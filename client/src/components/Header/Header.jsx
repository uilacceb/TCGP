import styles from "./Header.module.css"
import mainIcon from "../../assets/header-icon.png"
import cartImage from "../../assets/shoppingCart.png"
import loginIcon from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../App"


const Header = () => {

  const navigate = useNavigate();
  const { isLoggedIn, username, availableMoney } = useContext(AuthContext)



  return (
    <div className={styles.container}>
      <img style={{ cursor: "pointer" }} onClick={() => navigate("/pokemonCards")} src={mainIcon} height={80} />
      {!isLoggedIn ?
        <>
          <div className={styles.loginGroup}>
            <button className={styles.loginButton} onClick={() => navigate("/login")}> <img className={styles.loginIcon} src={loginIcon} height={50} width={70} />Login</button>
          </div>
        </> :
        <div className={styles.loginGroup}>
          <button className={styles.loginButton} onClick={() => navigate("/userInfo")}>
            <img className={styles.loginIcon} src={loginIcon} height={50} width={70} />
            <div className={styles.userPreview}>
              <p >{`Welcome ${username}`}</p>
              <p className={styles.availableMoney}>${availableMoney}</p>
            </div>
          </button>
        </div>}

      <img className={styles.cartImage} src={cartImage} height={60} width={60} onClick={() => navigate("/checkout")} />
    </div>

  )
}

export default Header