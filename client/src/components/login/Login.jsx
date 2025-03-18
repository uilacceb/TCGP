import styles from "../login/Login.module.css"
import loginLogo from "../../assets/Pokemon_25th_Anniversary_Logo.png"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { UserErrors } from "../../errors"
import { AuthContext } from "../../App"

const Login = () => {
  const navigate = useNavigate()
  const [inputUsername, setInputUsername] = useState(""); // Renamed to avoid conflict
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [_, setCookies] = useCookies(["access_token"]) //ignore the value of the cookie

  const { setIsLoggedIn, setUsername, username } = useContext(AuthContext)
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: inputUsername,
        password
      });
      const token = response.data.token; // Extract token from response
      setCookies("access_token", token)
      console.log("Received Token:", token);

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        localStorage.setItem("username", inputUsername); // Store username in local storage

        setUsername(inputUsername);
        setIsLoggedIn(true)
        navigate("/pokemonCards");
      }
      // if (token) {
      //   // Add debug before storing
      //   console.log("About to store token:", token);
      //   localStorage.setItem("token", token);

      //   // Verify token was stored
      //   const storedToken = localStorage.getItem("token");
      //   console.log("Verified stored token:", storedToken);

      //   localStorage.setItem("username", inputUsername);

      //   // Verify username was stored
      //   const storedUsername = localStorage.getItem("username");
      //   console.log("Verified stored username:", storedUsername);

      //   setUsername(inputUsername);
      //   setIsLoggedIn(true)
      //   navigate("/pokemonCards");
      // }

    } catch (err) {
      let errorMessage = "";
      switch (err.response?.data?.message) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User not found"
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "username and password does not match"
          break;
        default:
          errorMessage = "Something went wrong"
      }
      setError(errorMessage)
    }
  }

  const handleClosePage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Update auth context state
    setIsLoggedIn(false);
    setUsername("");

    // Navigate to home page
    navigate("/");
  }
  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <button className={styles.closeButton} height={50} width={60} onClick={handleClosePage}>x</button>
        <img src={loginLogo} height={60} width={80} />
        <div className={styles.element}>
          <label>Username:</label>
          <input className={styles.inputStyle} type="text" onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} />
        </div>
        <div className={styles.element}>
          <label>Password:</label>
          <input className={styles.inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <p>Doesn&#39;t have an account? <span onClick={() => navigate("/sign-up")} className={styles.SignUpHere}>Register here</span></p>
        <button className={styles.loginButton} onKeyDown={(e) => {
          if (e.key == "Enter") handleSubmit();
        }}>login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login