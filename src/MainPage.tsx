import React, { useEffect, Suspense } from 'react';
import { useState } from 'react';
// import Header from './components/Header/Header';
// import Body from './components/Body/Body';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from './store/store';
import GlobalStyle from './styles/global';
import styled from 'styled-components';
import PreviousButton from './components/PreviousButton';
import NextButton from './components/NextButton';
import { decrement, increment } from './store/PokeReducer';
import { getContrastColor } from './functions/color';
import { assignCurrentColor } from './store/colorReducer';

const Header = React.lazy(() => import('./components/Header/Header'));
const Body = React.lazy(() => import('./components/Body/Body'));

const Load = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  background-color: blue;
  transition: opacity 2s;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AnotherContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;

const Center = styled.div`
  flex-grow: 1;
`;

const Side = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//pull all fetch requests to this main page...-> promise.all
//to wait for all fetch requests to complete, then pass to
//components -> wouldn't that mean that every time one thing
// changes, everything will have to be refetched?
//TODO: implement lazy loading
//TODO: make sure next button stay within pokelist constraints
//TODO: make responsive

const MainPage: React.FC = () => {
  const generation = useSelector((state: rootState) => state.genNumber.value);
  const pokemon = useSelector((state: rootState) => state.pokeNumber.value);
  const color = useSelector((state: rootState) => state.color.currentValue);
  const dispatch = useDispatch();
  const [previousColor, setPreviousColor] = useState('');
  const [nextColor, setNextColor] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (pokemon - 1 > 0) {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon - 1}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          if (isMounted) {
            const background = getContrastColor(data.color.name);
            setPreviousColor(background);
          }
        })
        .catch((error) => {
          console.error('Error fetching data: ' + error);
        });
    }
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon + 1}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (isMounted) {
          const background = getContrastColor(data.color.name);
          setNextColor(background);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, [pokemon]);

  function Previous() {
    dispatch(decrement());
    if (pokemon >= 2) {
      dispatch(assignCurrentColor(previousColor));
    }

    console.log('previous: ' + previousColor);
  }

  function Next() {
    dispatch(increment());
    dispatch(assignCurrentColor(nextColor));

    console.log('next: ' + nextColor);
  }

  return (
    <>
      <GlobalStyle current={color} />
      <Container>
        <Suspense fallback={<Load />}>
          <Header generation={generation} pokemon={pokemon} />
        </Suspense>
        <AnotherContainer>
          <Side>
            <PreviousButton onClick={() => Previous()} />
          </Side>
          <Center>
            <Suspense fallback={<Load />}>
              <Body pokemon={pokemon} />
            </Suspense>
          </Center>
          <Side>
            <NextButton onClick={() => Next()} />
          </Side>
        </AnotherContainer>
      </Container>
    </>
  );
};

export default MainPage;
