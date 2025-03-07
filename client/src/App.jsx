import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/Pokemon-Cards/PokemonCard";
import Layout from "./components/Layout"
import Login from "./components/login/Login";
import SignUp from "./components/Signup/SignUp";
import { createContext, useState } from "react";
import { LandingPage } from "./components/LandingPage/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout/Checkout";


export const AuthContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("")
  const [availableMoney, setAvailableMoney] = useState(0)
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, availableMoney, setAvailableMoney }}>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/pokemonCards" element={
              <ProtectedRoute>
                <Layout><PokemonCard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Layout><Checkout /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )

}

export default App;
