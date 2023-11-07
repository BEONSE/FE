import styled from "styled-components";

const MyReservation = () => {
  return (
    <>
      <Title>예약 현황</Title>
      <TableDiv>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="70%" />
          </colgroup>
          <thead>
            <th>번호</th>
            <th>지점명</th>
            {/* 누르면 이동 */}
            <th>예약일시</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>XX점</td>
              <td>2023/11/06 12:12:12</td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
    </>
  );
};

export default MyReservation;

const Title = styled.h2`
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
