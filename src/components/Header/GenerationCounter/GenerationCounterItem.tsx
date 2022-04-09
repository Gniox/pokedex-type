import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { assignGenNumber } from '../../../store/GenReducer';
import { rootState } from '../../../store/store';
import { getPokeNumber } from '../../../functions/getPokeNumber';
import { fetchPokemon } from '../../../store/fetchPokemon';
import { fetchIndividualPokemon } from '../../../store/fetchIndividualPokemon';

const StyledListItem = styled.li`
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0px;
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
  key: string;
  index: number;
  generation: number;
}

function convertRomanToNumerical(name: string) {
  const splitName = name.split('-');
  const roman = splitName[splitName.length - 1].split('');
  let number = 0;

  console.log(roman);
  roman.forEach((char) => {
    console.log(char);
    switch (char) {
      case 'i':
        number += 1;
        break;
      case 'v':
        number += 5;
        break;
      case 'x':
        number += 10;
        break;
      case 'l':
        number += 50;
        break;
      default:
        console.log('Too many poke gens at this point...');
        break;
    }
  });

  return number;
}

function formatGeneration(name: string, index: number, generation: number) {
  // if (index !== generation) {
  //   const currentGeneration = false;
  //   setUnderLine(currentGeneration);
  // }
  const splitName = name.split('-');
  const formattedGeneration = 'Generation ' + splitName[splitName.length - 1];

  return formattedGeneration;
}

//TODO: underline generation if gen matches current
const GenerationCounterItem: React.FC<Props> = ({
  name,
  url,
  index,
  generation,
}) => {
  const dispatch = useDispatch();
  const currentGeneration = useSelector(
    (state: rootState) => state.genNumber.value
  );
  const formattedGeneration = formatGeneration(name, index, generation);
  // const [firstPokemon, setFirstPokemon] = useState(0);

  // useEffect(() => {
  //   let isMounted = true;
  //   fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       if (isMounted) {
  //         const firstPokemon = parseInt(
  //           getPokeNumber(data.pokemon_species[0].url)
  //         );
  //         setFirstPokemon(firstPokemon);
  //       }
  //       return () => {
  //         isMounted = false;
  //       };
  //     });
  // });

  //To fetch from store in functions, capitalize function name
  async function OnClick() {
    const generationNumber = convertRomanToNumerical(name);
    dispatch(assignGenNumber(generationNumber));
    dispatch(fetchPokemon(generationNumber));
    // dispatch(fetchIndividualPokemon(firstPokemon));
  }

  if (currentGeneration === parseInt(getPokeNumber(url))) {
    return (
      <StyledListItem
        style={{ textDecoration: 'underline' }}
        onClick={() => OnClick()}
      >
        {formattedGeneration}
      </StyledListItem>
    );
  } else {
    return (
      <StyledListItem onClick={() => OnClick()}>
        {formattedGeneration}
      </StyledListItem>
    );
  }
};

export default GenerationCounterItem;
