import React from 'react';
import * as s from '../../styles/div.styled';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { formatName } from '../../functions/formatName';

const RowTag = styled(s.Tag)`
  display: flex;
  flex-direction: row;
`;

const OutsideContainer = styled.div`
  margin: 1em;
  display: flex;
`;

const ItemContainer = styled.div`
  margin-right: 10px;
`;

const StyledList = styled.ul`
  list-style-type: none;
`;

type ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

interface Props {
  height: number;
  weight: number;
  abilities: ability[];
}

//Will take in Height, Weight, and abilities
//TODO: check whether ability is hidden and add to li
const DescriptionTag: React.FC<Props> = ({ height, weight, abilities }) => {
  return (
    <RowTag>
      <OutsideContainer>
        <ItemContainer>
          <h2>Height</h2>
          <h3>{height / 10 + ' m'}</h3>
        </ItemContainer>
        <ItemContainer>
          <h2>Weight</h2>
          <h3>{weight / 10 + ' kg'}</h3>
        </ItemContainer>
        <ItemContainer>
          <h2>Abilities</h2>
          <StyledList>
            {abilities.map((item) => {
              return item.is_hidden ? (
                <li key={uuidv4()}>
                  {formatName(item.ability.name) + ' (hidden)'}{' '}
                </li>
              ) : (
                <li key={uuidv4()}>{formatName(item.ability.name)}</li>
              );
            })}
          </StyledList>
        </ItemContainer>
      </OutsideContainer>
    </RowTag>
  );
};

export default DescriptionTag;
