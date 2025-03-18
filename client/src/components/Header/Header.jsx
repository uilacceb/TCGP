import styles from "./Header.module.css"
import mainIcon from "../../assets/header-icon.png"
import cartImage from "../../assets/shoppingCart.png"
import loginIcon from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../App"
import axios from "axios"


const Header = () => {

  const navigate = useNavigate();
  const { isLoggedIn, username, availableMoney, setAvailableMoney } = useContext(AuthContext)

  const token = localStorage.getItem("token")
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    getBalance()
  }, [availableMoney])

  const getBalance = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/availableMoney`, {
        headers: {
          Authorization: token
        }
      });
      setAvailableMoney(response.data.availableMoney)
    } catch (err) {
      console.error(err)
    }
  }



  return (
    <div className={styles.container}>
      <img onClick={() => navigate("/pokemonCards")} src={mainIcon} className={styles.headerLogo} />
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
      <div className={styles.cartContainer}>
        <img className={styles.cartImage} src={cartImage} height={60} width={60} onClick={() => navigate("/checkout")} />
      </div>
    </div>

  )
}

export default Header