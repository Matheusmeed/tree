import styled from 'styled-components';

export const Card = styled.div<{ isMain: boolean }>`
  background: #242527;
  width: 160px;
  height: 130px;
  border-radius: 7px;
  padding: 8px;
  border: ${({ isMain }) =>
    isMain ? '1px solid #EDA13F' : '1px solid #464646'};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 13px;
    color: #ffffff;
  }
`;

export const OptionsButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer !important;
  padding: 0 1px 0 3px;
  background-color: red;
  z-index: 9999;
`;

export const BodyDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
