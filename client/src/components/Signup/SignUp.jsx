import styles from "../Signup/Signup.module.css"
import loginLogo from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("passwords do not match")
      return
    }

    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        password
      });
      alert("Registered successfully")
      navigate("/login")

    } catch (err) {
      setError(err.response.data.message)
    }
  }



  return (
    <div className={styles.container}>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <button className={styles.closeButton} height={50} width={60} onClick={() => navigate("/")}>x</button>
        <img src={loginLogo} height={60} width={80} />
        <div className={styles.element}>
          <label>Username:</label>
          <input className={styles.inputStyle} type="text" onChange={(e) => setUserName(e.target.value)} value={username} />
        </div>
        <div className={styles.element}>
          <label>Password:</label>
          <input className={styles.inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className={styles.element}>
          <label>Confirm Password:</label>
          <input className={styles.inputStyle} type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </div>
        <p>Already have an account? <span className={styles.loginHere} onClick={() => navigate("/login")}>Login here</span></p>
        <button className={styles.signUpButton}>Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  )
}

export default SignUp