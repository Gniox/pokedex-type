import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import NameTag from './NameTag';
import DescriptionTag from './DescriptionTag';
// import StatTag from './StatTag';
// import EvolutionTag from './EvolutionTag/EvolutionTag';
const PokePic = React.lazy(() => import('./PokePic'));
const StatTag = React.lazy(() => import('./StatTag'));
const EvolutionTag = React.lazy(() => import('./EvolutionTag/EvolutionTag'));

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Load = styled.div`
  display: flex;
  max-width: 300px;
  max-height: 300px;
  transition: opacity 2s;
`;

const OutsideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }
`;

interface Props {
  pokemon: number;
}

//TODO: implement lazy load for main page, instead of just picture
//TODO: implement divs to not change size depending on stuff
//TODO: On generation click everything updates three times( because of evo chain?)
const Body: React.FC<Props> = ({ pokemon }) => {
  //TODO: put types into another file...
  type ability = {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };

  type stat = {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  };

  // type chain = {
  //   evolution_details: [];
  //   evolves_to: chain[];
  //   is_baby: boolean;
  //   species: {
  //     name: string;
  //     url: string;
  //   };
  // };

  // const tempObject: chain = {
  //   evolution_details: [],
  //   evolves_to: [],
  //   is_baby: false,
  //   species: {
  //     name: '',
  //     url: '',
  //   },
  // };

  const [pokeName, setPokeName] = React.useState('');
  const [flavorText, setFlavorText] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [abilities, setAbilities] = React.useState<ability[]>([]);
  const [baseStats, setBaseStats] = React.useState<stat[]>([]);

  //Two fetch request in useEffect... Is this okay?
  useEffect(() => {
    let isMounted = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          setPokeName(data.name);
          setHeight(data.height);
          setWeight(data.weight);
          setAbilities(data.abilities);
          setBaseStats(data.stats);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, [pokemon]);

  return (
    <OutsideContainer>
      <Container>
        <Div>
          <NameTag name={pokeName} flavorText={flavorText} pokemon={pokemon} />
          <DescriptionTag
            height={height}
            weight={weight}
            abilities={abilities}
          />
        </Div>
        <PokePic pokemon={pokemon} name={pokeName} />
      </Container>
      <Container>
        <Suspense fallback={<Load />}>
          <StatTag stats={baseStats} />
          <EvolutionTag pokemon={pokemon} />
        </Suspense>
      </Container>
    </OutsideContainer>
  );
};

export default Body;
