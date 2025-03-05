import styles from "../login/Login.module.css"
import loginLogo from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <button className={styles.closeButton} height={50} width={60} onClick={() => navigate("/")}>x</button>
        <img src={loginLogo} height={60} width={80} />
        <div className={styles.element}>
          <label>Email:</label>
          <input className={styles.inputStyle} type="text" />
        </div>
        <div className={styles.element}>
          <label>Password:</label>
          <input className={styles.inputStyle} type="password" />
        </div>
        <p>Doesn&#39;t have an account? <span onClick={() => navigate("/sign-up")} className={styles.SignUpHere}>Sign up here</span></p>
        <button className={styles.loginButton}>login</button>
      </form>
    </div>
  )
}

export default Login