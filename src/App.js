import styled from "styled-components";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import AppRoute from "./pages/AppRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <BlankDiv />
      <AppRoute />
      <Footer />
    </div>
  );
}

export default App;

const BlankDiv = styled.div`
  height: 7.5vh;
`;
