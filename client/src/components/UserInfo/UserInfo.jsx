import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";

const UserInfo = () => {
  const { availableMoney, setIsLoggedIn, setAvailableMoney } = useContext(AuthContext);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [triggerRefresh, setTriggerRefresh] = useState(0)
  const username = localStorage.getItem('username');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Calculate visible items based on screen width
  const getVisibleItemCount = () => {
    if (windowWidth <= 600) return 1;
    if (windowWidth <= 768) return 2;
    if (windowWidth <= 991) return 3;
    if (windowWidth <= 1280) return 4;
    return 5; // Default for larger screens
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getPurchasedItems();
    getBalance();
  }, [token, availableMoney, triggerRefresh]);

  const getBalance = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/availableMoney`, {
        headers: {
          Authorization: token
        }
      });
      setAvailableMoney(response.data.availableMoney);
    } catch (err) {
      console.error(err);
    }
  };

  const getPurchasedItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/purchasedItems`, {
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
      await axios.post(`${API_URL}/auth/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("error logging out: ", err);
    }
  };

  // Improved navigation functions
  const goToNextSlide = () => {
    const visibleItems = getVisibleItemCount();
    setCurrentItemIndex((prevIndex) => {
      const nextIndex = prevIndex + visibleItems;
      // If we would go past the end, loop back to start
      return nextIndex >= purchasedItems.length ? 0 : nextIndex;
    });
  };

  const goToPrevSlide = () => {
    const visibleItems = getVisibleItemCount();
    setCurrentItemIndex((prevIndex) => {
      const prevPage = prevIndex - visibleItems;
      // If we would go before the start, loop to the last page
      if (prevPage < 0) {
        const lastPageStart = Math.floor((purchasedItems.length - 1) / visibleItems) * visibleItems;
        return lastPageStart;
      }
      return prevPage;
    });
  };

  const goToSlide = (index) => {
    // When clicking dots, go to the start of the page containing the index
    const visibleItems = getVisibleItemCount();
    const pageStart = Math.floor(index / visibleItems) * visibleItems;
    setCurrentItemIndex(pageStart);
  };

  // Calculate which dot should be active
  const getCurrentPage = () => {
    const visibleItems = getVisibleItemCount();
    return Math.floor(currentItemIndex / visibleItems);
  };

  // Calculate total number of pages
  const getTotalPages = () => {
    const visibleItems = getVisibleItemCount();
    return Math.ceil(purchasedItems.length / visibleItems);
  };

  const handleRemoveItem = async (cardId, price, quantity) => {
    if (!token || !username) {
      console.error("Missing token or username");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/product/purchasedItems`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        data: {
          cardId,
          username,
          price,
          quantity
        }
      });

      console.log("Item removed:", response.data);
      setTriggerRefresh(prev => prev + 1)

    } catch (error) {
      console.error("Error removing item:", error);
    }
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
                style={{ transform: `translateX(-${currentItemIndex * 100 / getVisibleItemCount()}%)` }}
              >
                {purchasedItems.map((item, index) => (
                  <div
                    key={`${item.cardId}-${index}`}
                    className={styles.carouselItem}
                  >
                    <div>
                      <FaTrashCan className={styles.deleteIcon} color="#FF2B3D" onClick={() => handleRemoveItem(item.cardId, item.price, item.quantity)} />
                    </div>
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

        {purchasedItems.length > getVisibleItemCount() && (
          <div className={styles.carouselDots}>
            {Array.from({ length: getTotalPages() }).map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === getCurrentPage() ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index * getVisibleItemCount())}
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