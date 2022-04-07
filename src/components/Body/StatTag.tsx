import React from 'react';
import * as s from '../../styles/div.styled';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { getContrastColor } from '../../functions/color';

//TODO: make width of bar container scale
const BarContainer = styled.div`
  max-width: 90vw;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    display: flex;
    width: 10vw;
    max-width: 20vw;
    flex-direction: column;
  }
`;

const growAnimation = keyframes`
  0% {width: 0%; opacity: 0;}
  100% { opacity: 100}
`;

//height will need to be equal to words to match row
//included text in divs to make it the same size as
// other two columns

//TODO: make widtha percentage
//      pass width into styled component
//TODO: There is a delay with bar(stats reload and bar reloads twice)
const Bar = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: flex-start;
  color: rgba(0, 0, 0, 0);
  margin-bottom: 5px;
  animation-name: ${growAnimation};
  animation-duration: 2s;
`;

const OutsideContainer = styled.div`
  margin: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const StatDiv = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  word-break: keep-all;
`;

type stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

interface Props {
  stats: stat[];
}

function extractStats(stats: stat[]) {
  const baseStats: Array<number> = [];

  stats.forEach((item) => {
    baseStats.push(item.base_stat);
  });

  return baseStats;
}

function calculateTotal(stats: stat[]) {
  const baseStats = extractStats(stats);
  const intialValue = 0;
  const total = baseStats.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    intialValue
  );

  return total;
}

function calculatePercentage(baseStat: number) {
  const total = 255;
  const percentage = (baseStat / total) * 100;

  return percentage;
}

//implement function to calculate percentage for width of bar
const StatTag: React.FC<Props> = ({ stats }) => {
  const statColors = ['green', 'red', 'blue', 'orange', 'purple', 'yellow'];
  const total = calculateTotal(stats);

  return (
    <s.Tag>
      <OutsideContainer>
        <h2>Base Stats</h2>
        <Container>
          <ItemContainer>
            {stats.map((item) => {
              return <StatDiv key={uuidv4()}>{item.stat.name}</StatDiv>;
            })}
            <StatDiv>Total</StatDiv>
          </ItemContainer>
          <ItemContainer>
            {stats.map((item) => {
              return <StatDiv key={uuidv4()}>{item.base_stat}</StatDiv>;
            })}
            <StatDiv>{total}</StatDiv>
          </ItemContainer>
          <ItemContainer>
            {stats.map((item, index) => {
              return (
                <BarContainer key={uuidv4()}>
                  <Bar
                    color={statColors[index]}
                    style={{ width: `${calculatePercentage(item.base_stat)}%` }}
                  >
                    hello
                  </Bar>
                </BarContainer>
              );
            })}
          </ItemContainer>
        </Container>
      </OutsideContainer>
    </s.Tag>
  );
};

export default StatTag;
