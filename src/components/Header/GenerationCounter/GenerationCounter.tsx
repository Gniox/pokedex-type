import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';
import GenerationCounterItem from './GenerationCounterItem';
import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
  0% { opacity: 0;}
  100% { opacity: 100;}
`;

const Div = styled.div`
  flex-direction: column;
  text-align: center;
`;
const StyledList = styled.ul`
  display: block;
  list-style-type: none;
  height: 70px;
  animation-name: ${fadeAnimation};
  // animation-duration: 2s;
`;

interface Props {
  generation: number;
}
const GenerationCounter: React.FC<Props> = ({ generation }) => {
  type genItem = {
    name: string;
    url: string;
  };

  interface genList {
    count: number;
    next: string;
    previous: string;
    results: [genItem];
  }

  const [generationList, setGenerationList] = React.useState<genItem[]>([]);
  const [listShown, setListShown] = React.useState<genItem[]>([]);
  const [limit, setLimit] = React.useState(3);
  const [offset, setOffSet] = React.useState(0);

  //use effect for fetch requests
  useEffect(() => {
    let isMounted = true;
    fetch('https://pokeapi.co/api/v2/generation')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: genList) => {
        if (isMounted) {
          setGenerationList(data.results);
          setListShown(data.results.slice(offset, limit));
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, [generation]);

  function moveListUpByThree() {
    const newLimit = limit - 3;
    const newOffSet = offset - 3;
    const newList = generationList.slice(newOffSet, newLimit);

    if (newOffSet > -1) {
      setListShown(newList);
      setLimit(newLimit);
      setOffSet(newOffSet);
    }
  }

  //onClick of DownButton, it will move the generation list
  //down 3 item values.  It will also update the limit and
  // offset values.
  function moveListDownByThree() {
    //to make sure state updates, set values to variable
    //if using other states, use new value before updating
    //them as well, as there is delay before the next
    //re render
    const newLimit = limit + 3;
    const newOffSet = offset + 3;
    const newList = generationList.slice(newOffSet, newLimit);

    if (newOffSet < generationList.length) {
      setListShown(newList);
      setLimit(newLimit);
      setOffSet(newOffSet);
    }
  }

  //TODO: figure out a way to await li generation before returning component
  //      (buttons are instant while list takes a split second to load)
  //      Looks like this was fixed ... works sometimes
  return (
    <Div>
      <UpArrow onClick={moveListUpByThree} />
      <StyledList>
        {listShown.map((item, index) => {
          return (
            <GenerationCounterItem
              name={item.name}
              url={item.url}
              key={uuidv4()}
              index={index}
              generation={generation}
            />
          );
        })}
      </StyledList>
      <DownArrow onClick={moveListDownByThree} />
    </Div>
  );
};

export default GenerationCounter;
