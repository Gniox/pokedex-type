import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPokeNumber } from '../../../functions/getPokeNumber';
import { useDispatch, useSelector } from 'react-redux';
import { assignPokeNumber } from '../../../store/PokeReducer';
import { assignCurrentColor } from '../../../store/colorReducer';
import { getContrastColor } from '../../../functions/color';
import { rootState } from '../../../store/store';
import { fetchIndividualPokemon } from '../../../store/fetchIndividualPokemon';

const StyledListItem = styled.li`
  display: inline;
  margin-right: 5px;
  &:last-child {
    margin-right: 0px;
  }
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.1s linear;
`;

interface Props {
  name: string;
  url: string;
  // pokemon: number;
}

//TODO: underline listitem if  pokemon matches pokenumber
const NavBarItem: React.FC<Props> = ({ name, url }) => {
  const dispatch = useDispatch();
  const pokeNumber = getPokeNumber(url);
  const currentPokemon = useSelector(
    (state: rootState) => state.pokeNumber.value
  );
  const [color, setColor] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          const background = getContrastColor(data.color.name);
          setColor(background);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  });
  function onClick(pokeNumber: string, color: string) {
    const pokeNum = parseInt(pokeNumber);
    dispatch(assignPokeNumber(pokeNum));
    dispatch(fetchIndividualPokemon(pokeNum));
    dispatch(assignCurrentColor(color));
  }

  if (currentPokemon === parseInt(pokeNumber)) {
    return (
      <StyledListItem
        style={{ textDecoration: 'underline' }}
        onClick={() => onClick(pokeNumber, color)}
      >
        {pokeNumber}
      </StyledListItem>
    );
  } else {
    return (
      <StyledListItem onClick={() => onClick(pokeNumber, color)}>
        {pokeNumber}
      </StyledListItem>
    );
  }
};

export default NavBarItem;
