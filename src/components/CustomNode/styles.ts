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
  cursor: default;
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
  padding: 0 3px;
  position: absolute;
  right: 6px;
  top: 8px;
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

export const MenuDiv = styled.div`
  width: fit-content;
  background: red;
  position: absolute;
  right: 6px;
  top: 8px;
  border-radius: 8px;
  background: #1d1d1c;
  border: 1px solid #464646;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  :last-child {
    border-bottom: none;
  }

  button {
    height: 32px;
    width: 100%;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1d1d1c;
    border: none;
    border-bottom: 1px solid #464646;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background: #2c2d2f;
    }

    > img {
      width: 14px;
      height: 14px;
    }

    > p {
      font-weight: 400;
      font-size: 13px;
      color: #d0d1d1;
      white-space: nowrap;
    }
  }
`;
