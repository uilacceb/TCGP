import { useContext } from "react"
import { AuthContext } from "../../App"
import styles from "./UserInfo.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserInfo = () => {

  const { username, availableMoney, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout")
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      setIsLoggedIn(false)

      navigate("/login")
    } catch (err) {
      console.error("error logging out: ", err)
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfoCard}>
        <p className={styles.username}>Username: <strong>{username}</strong></p>
        <p className={styles.availableMoney}>Available money: <strong>${availableMoney}</strong></p>
        <p className={styles.cardsObtained}>Cards obtained:</p>
        <div className={styles.logoutText}
          onClick={handleLogout}>
          <p>Log out</p>
        </div>
      </div>

    </div>
  )
}

export default UserInfo