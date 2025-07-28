import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: #1d1d1c;

  .react-flow__attribution {
    display: none;
  }
`;

export const ButtonsDiv = styled.div`
  z-index: 9;
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 127px;
  height: 44px;
  background: #242527;
  border: 1px solid #464646;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  overflow: hidden;

  button {
    background: none;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #464646;
    transition: 0.3s;

    &:last-child {
      border-right: none;
    }

    &:hover {
      cursor: pointer;
      background: #303030;
    }
  }
`;
