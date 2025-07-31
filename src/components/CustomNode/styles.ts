import styled from 'styled-components';

export const Card = styled.div<{ isMain: boolean; isSpotlight: boolean }>`
  background: #242527;
  width: 160px;
  height: ${({ isSpotlight }) => (isSpotlight ? 'fit-content' : '130px')};
  border-radius: 7px;
  padding: 8px;
  border: ${({ isMain }) =>
    isMain ? '1px solid #EDA13F' : '1px solid #464646'};
  display: flex;
  flex-direction: column;
  gap: ${({ isMain, isSpotlight }) => (isMain || isSpotlight ? '8px' : '4px')};
  cursor: default;
  transition: 0.3s;

  &:hover {
    border: ${({ isMain }) =>
      isMain ? '1px solid #ffce8eff' : '1px solid #929393'};
  }
`;

export const TitleDiv = styled.div<{ isSpotlight: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    margin: 0;
    padding: 0;
    background: ${({ isSpotlight }) => (isSpotlight ? '#1D1D1C' : 'none')};
    padding: ${({ isSpotlight }) => (isSpotlight ? '4px' : '0')};
    color: ${({ isSpotlight }) => (isSpotlight ? '#D0D1D1' : '#ffffff')};
    font-size: ${({ isSpotlight }) => (isSpotlight ? '11px' : '13px')};
    font-weight: ${({ isSpotlight }) => (isSpotlight ? '400' : '600')};
    border-radius: 2px;
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
  display: flex;
  flex-direction: column;
  gap: 8px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  > p {
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
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

export const ChildrenNumber = styled.button`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background: #eea23f;
  border: none;
  cursor: pointer;

  p {
    color: black;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const TypeDiv = styled.div`
  background: #2c2d2f;
  width: fit-content;
  border-radius: 4px;
  padding: 4px 7px;

  > p {
    color: #ffffffe8;
    font-weight: 400;
    font-size: 10px;
  }
`;
