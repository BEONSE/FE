import { useState } from "react";
import { styled } from "styled-components";
import BranchApproveList from "./BranchApproveList";
import BranchAccpetList from "./BranchAcceptList";
import MemberList from "./MemberList";
import PaymentList from "./PaymentList";

const AdminManager = () => {
  const [isApproval, setApproval] = useState(false);
  const [isAccept, setAccept] = useState(false);
  const [isMemberList, setMemberList] = useState(false);
  const [isPaymentList, setPaymentList] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <>
      <Menu>
        <MenuContent
          className={selectedMenu === "approval" ? "selected" : ""}
          onClick={() => {
            setSelectedMenu("approval");
            setAccept(false);
            setApproval(true);
            setMemberList(false);
            setPaymentList(false);
          }}
        >
          승인 처리
        </MenuContent>
        <MenuContent
          className={selectedMenu === "accept" ? "selected" : ""}
          onClick={() => {
            setSelectedMenu("accept");
            setAccept(true);
            setApproval(false);
            setMemberList(false);
            setPaymentList(false);
          }}
        >
          승인 완료
        </MenuContent>
        <MenuContent
          className={selectedMenu === "memberList" ? "selected" : ""}
          onClick={() => {
            setSelectedMenu("memberList");
            setAccept(false);
            setApproval(false);
            setMemberList(true);
            setPaymentList(false);
          }}
        >
          전체 회원
        </MenuContent>

        <MenuContent
          className={selectedMenu === "paymentList" ? "selected" : ""}
          onClick={() => {
            setSelectedMenu("paymentList");
            setAccept(false);
            setApproval(false);
            setMemberList(false);
            setPaymentList(true);
          }}
        >
          전체 결제 내역
        </MenuContent>
      </Menu>
      {isApproval && <BranchApproveList />}
      {isAccept && <BranchAccpetList />}
      {isMemberList && <MemberList />}
      {isPaymentList && <PaymentList />}
    </>
  );
};

export default AdminManager;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5vh 10vw 5vh 10vw;
`;

const MenuContent = styled.div`
  &:active,
  &:focus {
    outline: auto;
    outline-color: #68d0f3;
    color: black;
  }

  &.selected {
    color: #56c7eb;
  }
`;
