import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/Pokemon-Cards/PokemonCard";
import Layout from "./components/Layout"



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><PokemonCard /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
