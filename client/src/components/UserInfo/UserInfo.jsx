import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import styles from "./UserInfo.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserInfo = () => {

  const { availableMoney, setIsLoggedIn } = useContext(AuthContext);

  const [purchasedItems, setPurchasedItems] = useState([])
  const username = localStorage.getItem('username')
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(() => {
    getPurchasedItems()
  }, [token])

  const getPurchasedItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/cart/purchasedItems/${username}`, {
        headers: {
          Authorization: token
        }
      });

      const items = response.data.purchasedItems || [];
      console.log(items)
      setPurchasedItems(items);


    } catch (err) {
      console.log(err)
    }
  }


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
        {purchasedItems && purchasedItems.map((item) => {
          return (<>
            <div className={styles.purchasedItems}>
              <img src={item.imageURL} />
              <div>
                <p>{item.productName}</p>
                <p>{item.quantity}</p>
              </div>
            </div>
          </>)
        })}

        <div className={styles.logoutText}
          onClick={handleLogout}>
          <p>Log out</p>
        </div>
      </div>

    </div>
  )
}

export default UserInfo