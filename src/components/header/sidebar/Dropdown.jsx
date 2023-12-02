import { useState } from "react";
import { usePageMoving } from "../../usePageMoving";

import styled from "styled-components";

const Dropdown = ({ clicked }) => {
  const [isOpen, setIsOpen] = useState(false); // 게시판 종류 클릭
  const {
    // 페이지 이동 hooks
    moveToReview,
    moveToMate,
  } = usePageMoving();

  return (
    <>
      <DropdownWrapper>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <span>▶</span> 게시판
        </DropdownHeader>
        {isOpen && (
          <DropdownList>
            <DropdownItem
              isOpen={isOpen}
              onClick={() => {
                moveToReview();
                clicked();
              }}
            >
              세차장 리뷰
            </DropdownItem>
            <DropdownItem
              isOpen={isOpen}
              onClick={() => {
                moveToMate();
                clicked();
              }}
            >
              세차 메이트
            </DropdownItem>
          </DropdownList>
        )}
      </DropdownWrapper>
    </>
  );
};
export default Dropdown;

const DropdownWrapper = styled.div`
  font-family: "S-CoreDream-light";
  width: 200px;
  position: relative;
  font-size: 16px;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  border-radius: 4px;

  & > span {
    display: inline-block;
    transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "none")};
    transition: transform 0.7s ease;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding-left: 17px;
  padding-top: 16px;
  cursor: pointer;

  &:hover {
    color: #99e8f8;
  }
`;
