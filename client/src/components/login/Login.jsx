import styles from "../login/Login.module.css"
import loginLogo from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { UserErrors } from "../../errors"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [_, setCookies] = useCookies(["access_token"]) //ignore the value of the cookie

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password
      });
      const token = response.data.token; // Extract token from response
      setCookies("access_token", token)
      console.log("Received Token:", token);

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        alert("Login successfully");
        navigate("/");
      }

    } catch (err) {
      let errorMessage = "";
      switch (err.response.data.message) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User not found"
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "username and password does not match"
          break;
        default:
          errorMessage = "Something went wrong"
      }
      alert("Error: " + errorMessage)
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
        <p>Doesn&#39;t have an account? <span onClick={() => navigate("/sign-up")} className={styles.SignUpHere}>Register here</span></p>
        <button className={styles.loginButton}>login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login