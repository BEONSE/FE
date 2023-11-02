import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainImage from "./assets/MainBackgroundImage.png";
import Payment from "./pages/payment";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <img src={MainImage} alt="MainImage" /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
