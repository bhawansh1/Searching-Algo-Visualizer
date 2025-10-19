import Grid from './components/Grid/Grid';
import Footer from './components/Footer/Footer';
import Guide from './components/Guide/Guide';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Grid />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
