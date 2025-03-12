import styles from "./CartSingleItem.module.css"

const CartSingleItem = ({ price, quantity, productName, src }) => {

  return (
    <>
      <div className={styles.singleItemCard}>
        <div className={styles.itemImageDiv}>
          <img src={src} className={styles.itemImage} />
        </div>
        <div className={styles.itemDetails}>
          <h3>{productName}</h3>
          <p>Price: ${price}</p>
          <p>Quantity: {quantity}</p>
          {/* <div className={styles.quantityControls}>
                        <button
                          onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                          +
                        </button>
                      </div> */}
          <p>Total: ${price * quantity}</p>
          {/* <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.cardId)}
                      >
                        Remove
                      </button> */}
        </div>
      </div></>
  )
}

export default CartSingleItem