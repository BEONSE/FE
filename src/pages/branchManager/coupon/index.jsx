import styled from "styled-components";

const CouponList = () => {
  return (
    <>
      <Title>
        <h2> XX지점 쿠폰 사용 페이지 </h2>
      </Title>
      <TableDiv>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="25%" />
            <col width="45%" />
          </colgroup>
          <thead>
            <th>번호</th>
            <th>쿠폰명</th>
            <th>회원명</th>
            <th>사용시간</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>고압 샤워 쿠폰</td>
              <td>김세차</td>
              <td>2023/11/06 12:12:12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>폼 샤워 쿠폰</td>
              <td>김세차</td>
              <td>2023/11/06 12:12:15</td>
            </tr>
            <tr>
              <td>3</td>
              <td>고압 샤워 쿠폰</td>
              <td>차가람</td>
              <td>2023/11/07 12:12:12</td>
            </tr>
            <tr>
              <td>4</td>
              <td>폼 샤워 쿠폰</td>
              <td>차가람</td>
              <td>2023/11/07 12:12:15</td>
            </tr>
            <tr>
              <td>5</td>
              <td>고압 샤워 쿠폰</td>
              <td>강혜광</td>
              <td>2023/11/08 12:12:12</td>
            </tr>
            <tr>
              <td>6</td>
              <td>폼 샤워 쿠폰</td>
              <td>강혜광</td>
              <td>2023/11/08 12:12:15</td>
            </tr>
            <tr>
              <td>7</td>
              <td>고압 샤워 쿠폰</td>
              <td>박가경</td>
              <td>2023/11/09 12:12:12</td>
            </tr>
            <tr>
              <td>8</td>
              <td>폼 샤워 쿠폰</td>
              <td>박가경</td>
              <td>2023/11/09 12:12:15</td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
    </>
  );
};

export default CouponList;

const Title = styled.div`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

const TableDiv = styled.div`
  margin: 0 5vw 5vh 5vw;
  text-align: center;

  & > table {
    width: 90vw;
    border: 1px solid #444444;
    border-collapse: collapse;
  }

  & > table > thead {
    font-size: 14px;
  }

  & > table > thead > th {
    height: 4vh;
    border: 1px solid #444444;
    background-color: #56c7eb;
  }

  & > table > tbody > tr > td {
    height: 4vh;
    border: 1px solid #444444;
  }

  & > table > tbody {
    font-size: 14px;
  }
`;
