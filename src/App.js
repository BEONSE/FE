import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BoardWrite from "./pages/boardWrite";
import BranchReservation from "./pages/branchReservation";
import MateList from "./pages/mateList";
import Payment from "./pages/payment";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/payments" element={<Payment />} />
          <Route path="/branchies" element={<BranchReservation />} />
          <Route path="/reviews" element={<BoardWrite />} />
          <Route path="/reviews/list" element={<MateList />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
