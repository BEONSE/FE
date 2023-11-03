import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Payment from "./pages/payment";
import Home from "./pages/home";
import BranchReservation from "./pages/branchReservation";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
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
