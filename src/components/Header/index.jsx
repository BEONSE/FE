import styled from "styled-components";
import Logo from "../../../src/assets/Logo.png";
import Hamburger from "../../../src/assets/hamburger_button.png";

const Header = () => {
  /* Styled Component */
  // Header All Style
  const HeaderBox = styled.div`
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-around;
  `;

  // Logo Image Style
  const LogoImg = styled.div`
    width: 100%;
    & > img {
      @media (max-width: 360px) {
        width: 30vw;
      }
      width: 18vw;
    }
  `;

  // Hamberger Button Style
  const HambergerBtn = styled.div`
    width: 20%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 2%;
    text-align: right;
    & > img {
      @media (max-width: 360px) {
        width: 35%;
      }
      width: 20%;
    }
  `;

  return (
    <>
      <HeaderBox>
        <LogoImg>
          <img src={Logo} alt="LogoImage" />
        </LogoImg>
        <HambergerBtn>
          <img src={Hamburger} alt="Menu button" onClick={() => {}} />
        </HambergerBtn>
      </HeaderBox>
    </>
  );
};

export default Header;
