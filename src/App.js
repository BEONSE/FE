import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Payment from "./pages/payment";
import Home from "./pages/home";
import BranchReservation from "./pages/branchReservation";
import BoardWrite from "./pages/boardWrite";
import BoardList from "./pages/boardList";

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
          <Route path="/reviews/list" element={<BoardList />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
