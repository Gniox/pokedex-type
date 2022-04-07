import React, { useState } from 'react';
import GenerationCounter from './GenerationCounter/GenerationCounter';
import NavBar from './NavBar/NavBar';
import SearchButton from './SearchMenu/SearchButton';
import styled from 'styled-components';
import SearchMenu from './SearchMenu/SearchMenu';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { isHidden } from '../../store/hiddenReducer';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Side = styled.div`
  width: 15%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Center = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
  justify-content: center;
`;

interface Props {
  generation: number;
  pokemon: number;
}

const Header: React.FC<Props> = ({ generation, pokemon }) => {
  const hidden = useSelector((state: rootState) => state.hidden.value);
  const dispatch = useDispatch();

  return (
    <Container>
      <Side>
        <GenerationCounter generation={generation} />
      </Side>
      <Center>
        <NavBar pokemon={pokemon} generation={generation} />
        <SearchMenu hidden={hidden} generation={generation} />
      </Center>
      <Side>
        <SearchButton
          hidden={hidden}
          onClick={() => dispatch(isHidden(hidden ? false : true))}
        />
      </Side>
    </Container>
  );
};

export default Header;
