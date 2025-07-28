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

  button {
    &:hover {
      cursor: pointer;
    }
  }
`;
