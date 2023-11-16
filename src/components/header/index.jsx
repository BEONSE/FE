import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Logo from "../../../src/assets/Logo.png";
import Hamburger from "../../../src/assets/hamburger_button.png";
import Sidebar from "./sidebar/SideBar";

const Header = () => {
  // State
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // useNavigate
  const navigate = useNavigate();
  // Modal Click Event
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <HeaderAllDiv>
        <HeaderBox>
          <LogoImg>
            <img
              src={Logo}
              alt="LogoImage"
              onClick={() => {
                navigate("/");
              }}
            />
          </LogoImg>
          <HambergerBtn>
            <img src={Hamburger} alt="SideMenu button" onClick={openSidebar} />
          </HambergerBtn>
        </HeaderBox>
        {isSidebarOpen && <Sidebar clicked={closeSidebar} />}
      </HeaderAllDiv>
    </>
  );
};

export default Header;

/* Styled Component */
// Header All Style
const HeaderAllDiv = styled.div`
  width: 35vw;
  @media (max-width: 1170px) {
    width: 100vw;
  }
  margin: auto;
`;
const HeaderBox = styled.div`
  position: fixed;
  width: 35vw;
  @media (max-width: 1170px) {
    width: 100vw;
  }
  height: 7.5vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-around;
  z-index: 20;
`;

// Logo Image Style
const LogoImg = styled.div`
  width: 100%;
  & > img {
    height: 7vh;
    cursor: pointer;
  }
`;

// Hamberger Button Style
const HambergerBtn = styled.div`
  width: 15%;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 2%;
  text-align: right;
  & > img {
    cursor: pointer;
    height: 4vh;
  }
`;
