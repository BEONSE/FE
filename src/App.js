import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainImage from "./assets/MainBackgroundImage.png";
import Payment from "./pages/payment";
import BranchReservation from "./pages/branchReservation";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <img src={MainImage} alt="MainImage" /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/payment" element={<Payment />} />
          <Route path="/branch" element={<BranchReservation />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
