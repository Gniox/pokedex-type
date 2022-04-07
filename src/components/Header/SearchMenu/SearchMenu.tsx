import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { sortPokemon } from '../../../functions/sortPokemon';
import { formatNumber, getPokeNumber } from '../../../functions/getPokeNumber';
import Sprite from '../../Body/EvolutionTag/Sprite';
import { rootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const upAnimation = keyframes`
  0% {transform: translateY: -50vh;}
  100% {transform: translateY: 0vh;}
`;

const Container = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 75vh;
  width: 75vw;
  background: rgba(255, 255, 255, 0.2);
  border: 0.2em solid rgba(255, 255, 255, 0.3);
  background-color: rgba(2);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(4px);
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 2;
`;

const BlockContainer = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0);
  background-color: rgba(2);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(4px);
  box-sizing: border-box;
  z-index: 1;
`;

const OutsideContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const AnotherContainer = styled.div`
  display: flex;
  margin: 1em;
`;

type pokeSpecies = {
  name: string;
  url: string;
};

type poke = {
  name: string;
  number: number;
};

function formatList(pokemon: pokeSpecies[]) {
  const formattedPokemon: poke[] = [];

  pokemon.forEach((item) => {
    const pokemon: poke = {
      name: item.name,
      number: parseInt(getPokeNumber(item.url)),
    };

    formattedPokemon.push(pokemon);
  });

  return formattedPokemon;
}

interface Props {
  hidden: boolean;
  generation: number;
}

const SearchMenu: React.FC<Props> = ({ hidden, generation }) => {
  const pokemon = useSelector((state: rootState) => state.pokeNumber.arr);
  const pokeList = formatList(pokemon);
  // const [pokeList, setPokeList] = React.useState<poke[]>([]);
  const color = useSelector((state: rootState) => state.color.currentValue);
  // useEffect(() => {
  //   let isMounted = true;
  //   const url = `https://pokeapi.co/api/v2/generation/${generation}/`;
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       if (isMounted) {
  //         const sortedPokemon = sortPokemon(data.pokemon_species);
  //         const formattedPokemon: poke[] = [];
  //         sortedPokemon.forEach((item) => {
  //           const pokemon: poke = {
  //             name: item.name,
  //             number: parseInt(getPokeNumber(item.url)),
  //           };

  //           formattedPokemon.push(pokemon);
  //         });
  //         setPokeList(formattedPokemon);
  //       }
  //     });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [generation]);

  return (
    <>
      <Container hidden={hidden}>
        <OutsideContainer color={color}>
          {pokeList.map((item) => {
            return (
              <AnotherContainer key={uuidv4()}>
                <h3>{formatNumber(item.number.toString())}</h3>
                <Sprite pokemon={item} color={color} />
              </AnotherContainer>
            );
          })}
        </OutsideContainer>
      </Container>
      <BlockContainer hidden={hidden} />
    </>
  );
};

export default SearchMenu;
