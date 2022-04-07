import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { sortPokemon } from '../../../functions/sortPokemon';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import NavBarItem from './NavBarItem';
import { getPokeNumber } from '../../../functions/getPokeNumber';
import { useDispatch } from 'react-redux';
import { assignPokeNumber, assignPokeList } from '../../../store/PokeReducer';
import { assignCurrentColor } from '../../../store/colorReducer';
import { getContrastColor } from '../../../functions/color';

const Div = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
`;

const TableDiv = styled.div`
  display: table;
  margin: 0 auto;
`;

const StyledList = styled.ul`
  list-style-type: none;
  text-align: center;
  justify: center;
  display: flex;
`;

interface Props {
  generation: number;
  pokemon: number;
}
//TODO: make li display:inline, for
//      horizontal alignment
const NavBar: React.FC<Props> = ({ generation, pokemon }) => {
  type pokeSpecies = {
    name: string;
    url: string;
  };

  // interface pokeList = {
  //   abilities:
  // }

  const dispatch = useDispatch();

  const [pokeList, setPokeList] = React.useState<pokeSpecies[]>([]);
  const [listShown, setListShown] = React.useState<pokeSpecies[]>([]);
  const [limit, setLimit] = React.useState(6);
  const [offset, setOffSet] = React.useState(0);

  //TODO: generation/{dynamic} -> passed in via the url
  //      at end of useEffect, you can add the prop in to check
  //      if it has changed, and it will call it once more !!!!
  useEffect(() => {
    let isMounted = true;
    const url = `https://pokeapi.co/api/v2/generation/${generation}/`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          const sortedPokemon = sortPokemon(data.pokemon_species);
          const newOffSet = 0;
          const newLimit = 6;
          setPokeList(sortedPokemon);
          setListShown(sortedPokemon.slice(newOffSet, newLimit));
          dispatch(
            assignPokeNumber(parseInt(getPokeNumber(sortedPokemon[0].url)))
          );
          dispatch(assignPokeList(sortedPokemon));
          setLimit(newLimit);
          setOffSet(newOffSet);

          fetch(sortedPokemon[0].url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw response;
            })
            .then((data) => {
              if (isMounted) {
                const background = getContrastColor(data.color.name);
                dispatch(assignCurrentColor(background));
              }
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, [generation]);

  function moveListUpBySix() {
    const newLimit = limit + 6;
    const newOffSet = offset + 6;
    const newList = pokeList.slice(newOffSet, newLimit);

    if (newOffSet < pokeList.length) {
      setListShown(newList);
      setLimit(newLimit);
      setOffSet(newOffSet);
    }
  }

  function moveListDownBySix() {
    const newLimit = limit - 6;
    const newOffSet = offset - 6;
    const newList = pokeList.slice(newOffSet, newLimit);

    if (newOffSet > -1) {
      setListShown(newList);
      setLimit(newLimit);
      setOffSet(newOffSet);
    }
  }

  return (
    <Div>
      <LeftArrow onClick={moveListDownBySix} />
      <TableDiv>
        <StyledList>
          {listShown.map((item) => {
            return (
              <NavBarItem
                key={uuidv4()}
                name={item.name}
                url={item.url}
                // pokemon={pokemon}
              />
            );
          })}
        </StyledList>
      </TableDiv>
      <RightArrow onClick={moveListUpBySix} />
    </Div>
  );
};

export default NavBar;
