import { useContext } from "react"
import { AuthContext } from "../../App"
import styles from "./UserInfo.module.css"


const UserInfo = () => {

  const { username, availableMoney } = useContext(AuthContext)

  return (
    <div className={styles.container}>
      <div className={styles.userInfoCard}>
        <p className={styles.username}>Username: <strong>{username}</strong></p>
        <p className={styles.availableMoney}>Available money: <strong>${availableMoney}</strong></p>
        <p className={styles.cardsObtained}>Cards obtained:</p>
      </div>
    </div>
  )
}

export default UserInfo