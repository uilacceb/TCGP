import styles from "../Signup/Signup.module.css"
import loginLogo from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <form className={styles.signUpForm}>
        <button className={styles.closeButton} height={50} width={60} onClick={() => navigate("/")}>x</button>
        <img src={loginLogo} height={60} width={80} />
        <div className={styles.element}>
          <label>Username:</label>
          <input className={styles.inputStyle} type="text" />
        </div>
        <div className={styles.element}>
          <label>Password:</label>
          <input className={styles.inputStyle} type="password" />
        </div>
        <div className={styles.element}>
          <label>Confirm Password:</label>
          <input className={styles.inputStyle} type="password" />
        </div>
        <p>Already have an account? <span className={styles.loginHere} onClick={() => navigate("/login")}>Login here</span></p>
        <button className={styles.signUpButton}>Register</button>
      </form>
    </div>
  )
}

export default SignUp