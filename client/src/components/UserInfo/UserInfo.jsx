import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const { availableMoney, setIsLoggedIn } = useContext(AuthContext);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getPurchasedItems();
  }, [token]);





  const getPurchasedItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/cart/purchasedItems/${username}`, {
        headers: {
          Authorization: token
        }
      });

      const items = response.data.purchasedItems || [];
      console.log(items);
      setPurchasedItems(items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("error logging out: ", err);
    }
  };

  const goToNextSlide = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === purchasedItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? purchasedItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentItemIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfoCard}>
        <p className={styles.username}>Username: <strong>{username}</strong></p>
        <p className={styles.availableMoney}>Available money: <strong>${availableMoney}</strong></p>
        <p className={styles.cardsObtained}>Cards obtained:</p>

        {purchasedItems.length > 0 ? (
          <div className={styles.carouselContainer}>
            <button
              className={styles.carouselButton}
              onClick={goToPrevSlide}
            >
              &lt;
            </button>

            <div className={styles.carouselWrapper}>
              <div
                className={styles.carouselSlide}
                style={{ transform: `translateX(-${currentItemIndex * 100}%)` }}
              >
                {purchasedItems.map((item, index) => (
                  <div
                    key={`${item.cardId}-${index}`}
                    className={styles.carouselItem}
                  >
                    <img
                      src={item.imageURL}
                      alt={item.productName}
                      className={styles.carouselImage}
                    />
                    <div className={styles.carouselInfo}>
                      <p className={styles.productName}>{item.productName}</p>
                      <p className={styles.productQuantity}>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={styles.carouselButton}
              onClick={goToNextSlide}
            >
              &gt;
            </button>
          </div>
        ) : (
          <p className={styles.noPurchases}>No purchased items yet</p>
        )}

        {purchasedItems.length > 1 && (
          <div className={styles.carouselDots}>
            {purchasedItems.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentItemIndex ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        )}

        <div className={styles.logoutText} onClick={handleLogout}>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;