import React from 'react';
import styled from 'styled-components';
import * as s from '../../../styles/button.styled';

const SButton = styled(s.Button).attrs({
  'aria-label': 'Search',
})`
  z-index: 2;
  background-color: grey;
`;

interface Props {
  onClick?: React.MouseEventHandler<HTMLElement>;
  hidden: boolean;
}

//TODO: x button being dumb

const SearchButton: React.FC<Props> = ({ onClick, hidden }) => {
  if (hidden) {
    return (
      <SButton onClick={onClick}>
        <svg
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
        >
          <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z" />
        </svg>
      </SButton>
    );
  } else {
    return (
      <SButton onClick={onClick}>
        <svg
          fill="#FFFFFF"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
        </svg>
      </SButton>
    );
  }
};

export default SearchButton;
