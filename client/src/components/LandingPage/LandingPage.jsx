
import styles from "./LandingPage.module.css"

export const LandingPage = () => {

  return (
    <div className={styles.landingBG}>
      <div className={styles.landing}>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>TCG Pocket</h1>
          <h3 className={styles.description}>Please login to see all cards</h3>
        </div>
      </div>
    </div>
  )
}
