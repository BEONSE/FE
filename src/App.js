import styled from "styled-components";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import AppRoute from "./pages/AppRoute";
import { useState } from "react";
import { addAuthHeader } from "./apis/axiosConfig";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  const accessToken = localStorage.getItem("accessToken") || "";
  if (accessToken !== "") {
    addAuthHeader(accessToken);
  }

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <BlankDiv />}
      <Wrapper>
        <CompDiv>
          <ScrollToTop />
          <AppRoute setHideHeaderFooter={setHideHeaderFooter} />
        </CompDiv>
        {!hideHeaderFooter && <Footer />}
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BlankDiv = styled.div`
  height: 7.2vh;
`;

const CompDiv = styled.div`
  flex: 1;
`;
