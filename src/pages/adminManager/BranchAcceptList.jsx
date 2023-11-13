import { styled } from "styled-components";

const BranchAccpetList = () => {
  return (
    <>
      <TableDiv>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="13%" />
            <col width="12%" />
            <col width="40%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <th>지점사 번호</th>
            <th>지점사 명</th>
            <th>대표자 명</th>
            <th>주소</th>
            <th>승인 여부</th>
          </thead>
          <tbody>
            <td>3002</td>
            <td>가산점</td>
            <td>차가람</td>
            <td>서울특별시 금천구 가산동</td>
            <td>승인 완료</td>
          </tbody>
          <tbody>
            <td>3002</td>
            <td>가산점</td>
            <td>차가람</td>
            <td>서울특별시 금천구 가산동</td>
            <td>승인 완료</td>
          </tbody>
        </table>
      </TableDiv>
    </>
  );
};

export default BranchAccpetList;

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