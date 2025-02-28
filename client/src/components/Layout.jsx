
import Header from './Header/Header'
import Footer from './Footer/Footer'
import styles from "./Layout.module.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
        {children}
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout