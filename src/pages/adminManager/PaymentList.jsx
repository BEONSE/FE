import { styled } from "styled-components";

const PaymentList = () => {
  return (
    <>
      <TableDiv>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="20%" />
            <col width="15%" />
            <col width="15%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <th>회원 번호</th>
            <th>회원명</th>
            <th>지점사 명</th>
            <th>쿠폰 종류</th>
            <th>사용 포인트</th>
            <th>잔여 포인트</th>
          </thead>
          <tbody>
            <td>3002</td>
            <td>차가람</td>
            <td>가산점</td>
            <td>폼 세차</td>
            <td>6,000</td>
            <td>14,000</td>
          </tbody>
          <tbody>
            <td>3002</td>
            <td>차가람</td>
            <td>가산점</td>
            <td>폼 세차</td>
            <td>6,000</td>
            <td>14,000</td>
          </tbody>
        </table>
      </TableDiv>
    </>
  );
};

export default PaymentList;

const TableDiv = styled.div`
  margin: 0 10vw 0 10vw;
  text-align: center;

  & > table {
    width: 80vw;
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

  & > table > tbody > td {
    height: 4vh;
    border: 1px solid #444444;
  }
  & > table > tbody {
    font-size: 14px;
  }
`;
