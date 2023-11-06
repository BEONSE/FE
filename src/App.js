import styled from "styled-components";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import AppRoute from "./pages/AppRoute";
import { useState } from "react";

function App() {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <BlankDiv />}
      <AppRoute setHideHeaderFooter={setHideHeaderFooter} />
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;

const BlankDiv = styled.div`
  height: 7.5vh;
`;
