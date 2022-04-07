import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../styles/div.styled';
import { formatNumber } from '../../functions/getPokeNumber';
import { formatName } from '../../functions/formatName';

interface Props {
  name: string;
  flavorText: string;
  pokemon: number;
}

const OutsideContainer = styled.div`
  margin: 1em;
`;

const NameTag: React.FC<Props> = ({ name, flavorText, pokemon }) => {
  return (
    <Tag>
      <OutsideContainer>
        <h2>{formatNumber(pokemon.toString())}</h2>
        <h1>{formatName(name)}</h1>
        {/* <h3>{flavorText}</h3> */}
      </OutsideContainer>
    </Tag>
  );
};

export default NameTag;
