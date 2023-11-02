import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Payment from "./pages/payment";

function App() {
  return (
    <div className="App">
      <Header />
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
