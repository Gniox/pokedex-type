import React, { useState, useEffect } from 'react';
import { Tag } from '../../../styles/div.styled';
import { getPokeNumber } from '../../../functions/getPokeNumber';
import styled from 'styled-components';
import { rootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import EvoArrow from './EvoArrow';
import { v4 as uuidv4 } from 'uuid';
import Sprite from './Sprite';

const OutsideContainer = styled.div`
  margin: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

type chain = {
  evolution_details: [];
  evolves_to: chain[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
};

interface Props {
  pokemon: number;
}

type poke = {
  name: string;
  number: number;
};

function getPokeEvolutions(chain: chain) {
  let generations: poke[] = [];

  const pokemon: poke = {
    name: chain.species.name,
    number: parseInt(getPokeNumber(chain.species.url)),
  };

  if (chain.evolves_to.length > 0) {
    generations = getPokeEvolutions(chain.evolves_to[0]);
  }

  generations.unshift(pokemon);

  return generations;
}

//TODO: extract containers from bottom into seperate component so I can use it
//      for search button
//      It's broken due to the fact that on initial load, there is no evolutions set
const EvolutionTag: React.FC<Props> = ({ pokemon }) => {
  const color = useSelector((state: rootState) => state.color.currentValue);
  const [evolutions, setEvolutions] = useState<poke[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          fetch(data.evolution_chain.url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw response;
            })
            .then((data) => {
              setEvolutions(getPokeEvolutions(data.chain));
            })
            .catch((error) => {
              console.error('Error fetching data: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
  }, [pokemon]);

  return (
    <Tag>
      <OutsideContainer>
        <h2>Evolution Chain</h2>
        <Container>
          {evolutions.map((item, index, { length }) => {
            if (length - 1 === index) {
              return (
                <Container key={uuidv4()}>
                  <Sprite pokemon={item} color={color} />
                </Container>
              );
            } else {
              return (
                <Container key={uuidv4()}>
                  <Sprite pokemon={item} color={color} />
                  <EvoArrow />
                </Container>
              );
            }
          })}
        </Container>
      </OutsideContainer>
    </Tag>
  );
};

export default EvolutionTag;
