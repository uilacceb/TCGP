import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/Pokemon-Cards/PokemonCard";
import Layout from "./components/Layout"
import Login from "./components/login/Login";
import SignUp from "./components/Signup/SignUp";
import { createContext, useState } from "react";


export const AuthContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("")
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
          <Routes>
            <Route path="/" element={<Layout><PokemonCard /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )

}

export default App;
