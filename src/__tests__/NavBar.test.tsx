import React from 'react';
import NavBar from '../components/Header/NavBar/NavBar';
import { render, screen, act, within, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

require('jest-fetch-mock').enableMocks();

describe('NavBar', () => {
  const mockData =
    '{"pokemon_species":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon-species/1/"},' +
    '{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon-species/4/"},' +
    '{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-species/7/"},' +
    '{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon-species/10/"},' +
    '{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon-species/13/"},' +
    '{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon-species/16/"},' +
    '{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon-species/19/"},' +
    '{"name":"spearow","url":"https://pokeapi.co/api/v2/pokemon-species/21/"},' +
    '{"name":"ekans","url":"https://pokeapi.co/api/v2/pokemon-species/23/"},' +
    '{"name":"sandshrew","url":"https://pokeapi.co/api/v2/pokemon-species/27/"},' +
    '{"name":"nidoran-f","url":"https://pokeapi.co/api/v2/pokemon-species/29/"},' +
    '{"name":"nidoran-m","url":"https://pokeapi.co/api/v2/pokemon-species/32/"},' +
    '{"name":"vulpix","url":"https://pokeapi.co/api/v2/pokemon-species/37/"},' +
    '{"name":"zubat","url":"https://pokeapi.co/api/v2/pokemon-species/41/"},' +
    '{"name":"oddish","url":"https://pokeapi.co/api/v2/pokemon-species/43/"},' +
    '{"name":"paras","url":"https://pokeapi.co/api/v2/pokemon-species/46/"},' +
    '{"name":"venonat","url":"https://pokeapi.co/api/v2/pokemon-species/48/"},' +
    '{"name":"diglett","url":"https://pokeapi.co/api/v2/pokemon-species/50/"},' +
    '{"name":"meowth","url":"https://pokeapi.co/api/v2/pokemon-species/52/"}]}';

  const jsonObject = JSON.parse(mockData);

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Displays 6 Pokemon Species Numbers', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
    await act(async () => {
      render(<NavBar />);
    });

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');

    expect(items.length).toBe(6);
  });
  it('is sorted numerically from smallest to largest', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
    await act(async () => {
      render(<NavBar />);
    });

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');

    items.forEach((element, index) => {
      if (index > 0) {
        const currentElement: string = element.textContent ?? '0';
        const previousElement: string = items[index - 1].textContent ?? '0';

        expect(parseInt(currentElement)).toBeGreaterThan(
          parseInt(previousElement)
        );
      }
    });
  });
  describe('Right Arrow', () => {
    const mockData =
      '{"pokemon_species":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon-species/1/"},' +
      '{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon-species/2/"},' +
      '{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon-species/3/"},' +
      '{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon-species/4/"},' +
      '{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon-species/5/"},' +
      '{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon-species/6/"},' +
      '{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-species/7/"},' +
      '{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon-species/8/"},' +
      '{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon-species/9/"},' +
      '{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon-species/10/"},' +
      '{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon-species/11/"},' +
      '{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon-species/12/"},' +
      '{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon-species/13/"},' +
      '{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon-species/14/"},' +
      '{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon-species/15/"},' +
      '{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon-species/16/"},' +
      '{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon-species/17/"},' +
      '{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon-species/18/"}]}';

    const jsonObject = JSON.parse(mockData);

    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('moves pokemon count right by 6', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
      await act(async () => {
        render(<NavBar />);
      });

      const rightButton = screen.getByRole('button', {
        name: 'right',
      });
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');

      items.forEach((element, index) => {
        console.log(element.textContent);
        expect(parseInt(element.textContent ?? '0')).toBe(index + 1);
      });

      fireEvent.click(rightButton);
      const newItems = getAllByRole('listitem');

      newItems.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 6 + 1);
      });
    });
    it('stops at list end', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
      await act(async () => {
        render(<NavBar />);
      });

      const rightButton = screen.getByRole('button', {
        name: 'right',
      });
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);

      for (let i = 0; i < 5; i++) {
        fireEvent.click(rightButton);
      }

      const items = getAllByRole('listitem');

      items.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 12 + 1);
      });
    });
  });
  describe('Left Arrow', () => {
    const mockData =
      '{"pokemon_species":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon-species/1/"},' +
      '{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon-species/2/"},' +
      '{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon-species/3/"},' +
      '{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon-species/4/"},' +
      '{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon-species/5/"},' +
      '{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon-species/6/"},' +
      '{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-species/7/"},' +
      '{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon-species/8/"},' +
      '{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon-species/9/"},' +
      '{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon-species/10/"},' +
      '{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon-species/11/"},' +
      '{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon-species/12/"},' +
      '{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon-species/13/"},' +
      '{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon-species/14/"},' +
      '{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon-species/15/"},' +
      '{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon-species/16/"},' +
      '{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon-species/17/"},' +
      '{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon-species/18/"}]}';

    const jsonObject = JSON.parse(mockData);

    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('moves pokemon count left by 6', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
      await act(async () => {
        render(<NavBar />);
      });

      const rightButton = screen.getByRole('button', {
        name: 'right',
      });
      const leftButton = screen.getByRole('button', {
        name: 'left',
      });
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');

      items.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 1);
      });

      fireEvent.click(rightButton);
      fireEvent.click(leftButton);
      const newItems = getAllByRole('listitem');

      newItems.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 1);
      });
    });
    it('stops at list start', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
      await act(async () => {
        render(<NavBar />);
      });

      const leftButton = screen.getByRole('button', {
        name: 'left',
      });

      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');

      items.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 1);
      });

      fireEvent.click(leftButton);
      const newItems = getAllByRole('listitem');

      newItems.forEach((element, index) => {
        expect(parseInt(element.textContent ?? '0')).toBe(index + 1);
      });
    });
  });
});
