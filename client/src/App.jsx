import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/Pokemon-Cards/PokemonCard";
import Layout from "./components/Layout"
import Login from "./components/login/Login";
import SignUp from "./components/Signup/SignUp";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><PokemonCard /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
