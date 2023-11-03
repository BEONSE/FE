import styled from "styled-components";

export const ConmmonButton = styled.button`
  font-family: "S-CoreDream-medium", sans-serif;
  color: black;
  text-decoration: none;
  font-size: 13px;

  background-color: #99e8f8;

  outline: none;
  border: none;
  border-radius: 8px;

  transition: background-color 0.5s ease, transform 0.1s ease;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;

  cursor: pointer;

  &:hover {
    background-color: #68d0f3;
  }
  &:active {
    transform: translate(2px, 2px);
  }
`;
