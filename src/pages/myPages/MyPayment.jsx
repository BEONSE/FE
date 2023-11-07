import styled from "styled-components";

const MyPayment = () => {
  return (
    <>
      <Title>
        <h2>결제 페이지</h2>
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
            <th>결제 금액</th>
            <th>결제 포인트</th>
            <th>결제 시간</th>
          </thead>
          <tbody>
            <td>1</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>2</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
          <tbody>
            <td>3</td>
            <td>10,000</td>
            <td>11,000</td>
            <td>2023/11/06 12:12:12</td>
          </tbody>
        </table>
      </TableDiv>
    </>
  );
};

export default MyPayment;

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

  & > table > tbody > td {
    height: 4vh;
    border: 1px solid #444444;
  }
  & > table > tbody {
    font-size: 14px;
  }
`;
