import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatName } from '../../../functions/formatName';
import { useDispatch } from 'react-redux';
import { assignCurrentColor } from '../../../store/colorReducer';
import { assignPokeNumber } from '../../../store/PokeReducer';
import { isHidden } from '../../../store/hiddenReducer';
import { getContrastColor } from '../../../functions/color';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

type color = {
  current: string;
};

const Image = styled.img<color>`
  max-width: 300px;
  height: auto;
  background: rgba(255, 255, 255, 0.4);
  border: 0.5em solid ${(props) => props.current};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(4px);
  border-radius: 50%;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.7);
    transition-delay: 0.1s;
  }
`;

type poke = {
  name: string;
  number: number;
};

interface Props {
  pokemon: poke;
  color: string;
}

const Sprite: React.FC<Props> = ({ pokemon, color }) => {
  const dispatch = useDispatch();
  const [nextColor, setNextColor] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          const color = getContrastColor(data.color.name);
          setNextColor(color);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, [pokemon]);

  function EvoClick(number: number, nextColor: string) {
    dispatch(assignPokeNumber(number));
    dispatch(assignCurrentColor(nextColor));
    dispatch(isHidden(true));
  }

  return (
    <ItemContainer>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`}
        alt={pokemon.name}
        current={color}
        onClick={() => EvoClick(pokemon.number, nextColor)}
      />
      <h3>{formatName(pokemon.name)}</h3>
    </ItemContainer>
  );
};

export default Sprite;
