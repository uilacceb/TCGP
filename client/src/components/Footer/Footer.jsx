import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>Developed by Rebecca &copy; {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer