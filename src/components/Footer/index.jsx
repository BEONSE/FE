import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
/**Styled Component */
// Footer 전체 Style
const FooterBox = styled.div`
  width: 100%;

  padding-left: 2%;
  padding-right: 2%;
  padding-top: 5%;
  padding-bottom: 5%;

  background-color: black;
`;

// P태그 Style
const CompanyInfo = styled.p`
  color: white;

  text-align: center;
  font-size: 12px;
`;

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
