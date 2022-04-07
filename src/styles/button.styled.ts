import styled from 'styled-components';

export const Button = styled.button`
  height: 80px;
  width: 80px;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
  svg {
    outline: none;
    transition: transform 0.1s linear;
  }
`;
