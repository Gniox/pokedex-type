import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    justify-content: end;
  }
`;

const Image = styled.img`
  max-width: 70%;
  height: auto;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5));
`;

interface Props {
  pokemon: number;
  name: string;
}

const PokePic: React.FC<Props> = ({ pokemon, name }) => {
  return (
    <Container>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`}
        alt={name + ' picture'}
      />
    </Container>
  );
};

export default PokePic;
