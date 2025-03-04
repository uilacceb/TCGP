import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/Pokemon-Cards/PokemonCard";
import Layout from "./components/Layout"
import PokemonDetail from "./components/Pokemon-Details/PokemonDetail";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><PokemonCard /></Layout>} />
          <Route path="/details" element={<Layout><PokemonDetail /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
