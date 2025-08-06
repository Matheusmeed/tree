import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

export const BackgroundImage = styled.img<{ isHidden: boolean }>`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: ${({ isHidden }) => (isHidden ? 'grayscale(100%)' : 'none')};
`;

export const SvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  > svg {
    width: 100%;
    height: 100%;
  }
`;
