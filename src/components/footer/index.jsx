import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";

const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <FooterBox>
        <CompanyInfo>
          상호 : BEONSE | 주소 : 서울특별시 금천구 가산디지털1로 168, B동 1207호
          <br />
          대표 : 차가람 | 사업자등록번호 : 123-45-678900 <br />
          이메일 : beonse@beonse.co.kr 업태 : 서비스업
          <br />
          종목 : 프랜차이즈 | 대표번호 : 1234-4567 성공창업/AS문의 <br />
          <br />
          Coptright ⓒ 2023 BEONSE. All Rights Reserved.
        </CompanyInfo>
      </FooterBox>
    </>
  );
};

export default Footer;

/**Styled Component */
// Footer 전체 Style
const FooterBox = styled.div`
  width: 35vw;
  @media (max-width: 1170px) {
    width: 100vw;
  }
  margin: auto;

  padding-left: 1%;
  padding-right: 1%;
  padding-top: 3%;
  padding-bottom: 3%;

  background-color: black;
`;

// P태그 Style
const CompanyInfo = styled.p`
  color: white;

  text-align: center;
  font-size: 12px;
`;
