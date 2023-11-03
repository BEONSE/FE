import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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
                navigate("/");
              }}
            >
              지점 리뷰
            </DropdownItem>
            <DropdownItem
              isOpen={isOpen}
              onClick={() => {
                navigate("/");
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
    transition: transform 0.7s ease; // 부드러운 회전 효과 추가
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
