import React from 'react';
import GenerationCounter from '../components/Header/GenerationCounter/GenerationCounter';
import { render, screen, act, within, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

require('jest-fetch-mock').enableMocks();

//TODO: Find a better way to hold mock JSON data...
describe('GenerationCounter', () => {
  const mockData =
    '{"count":8,"next":null,"previous":null,"results":' +
    '[{"name":"generation-i","url":"https://pokeapi.co/api/v2/generation/1/"},' +
    '{"name":"generation-ii","url":"https://pokeapi.co/api/v2/generation/2/"},' +
    '{"name":"generation-iii","url":"https://pokeapi.co/api/v2/generation/3/"},' +
    '{"name":"generation-iv","url":"https://pokeapi.co/api/v2/generation/4/"},' +
    '{"name":"generation-v","url":"https://pokeapi.co/api/v2/generation/5/"},' +
    '{"name":"generation-vi","url":"https://pokeapi.co/api/v2/generation/6/"},' +
    '{"name":"generation-vii","url":"https://pokeapi.co/api/v2/generation/7/"},' +
    '{"name":"generation-viii","url":"https://pokeapi.co/api/v2/generation/8/"}]}';

  const jsonObject = JSON.parse(mockData);

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Displays 3 Pokemon generations', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
    await act(async () => {
      render(<GenerationCounter />);
    });

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');

    expect(items.length).toBe(3);
  });

  it('changes mouse to click on hover for list elements', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(jsonObject));
    await act(async () => {
      render(<GenerationCounter />);
    });

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');

    fireEvent.mouseOver(items[0]);
  });

  //  Make sure to mock AP call...
  describe('Down Arrow', () => {
    const mockData =
      '{"count":8,"next":null,"previous":null,"results":' +
      '[{"name":"generation-i","url":"https://pokeapi.co/api/v2/generation/1/"},' +
      '{"name":"generation-ii","url":"https://pokeapi.co/api/v2/generation/2/"},' +
      '{"name":"generation-iii","url":"https://pokeapi.co/api/v2/generation/3/"},' +
      '{"name":"generation-iv","url":"https://pokeapi.co/api/v2/generation/4/"},' +
      '{"name":"generation-v","url":"https://pokeapi.co/api/v2/generation/5/"},' +
      '{"name":"generation-vi","url":"https://pokeapi.co/api/v2/generation/6/"},' +
      '{"name":"generation-vii","url":"https://pokeapi.co/api/v2/generation/7/"},' +
      '{"name":"generation-viii","url":"https://pokeapi.co/api/v2/generation/8/"}]}';

    const jsonObject = JSON.parse(mockData);

    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('moves generations count down 3', async () => {
      const generation = [
        'Generation i',
        'Generation ii',
        'Generation iii',
        'Generation iv',
        'Generation v',
        'Generation vi',
        'Generation vii',
        'Generation viii',
      ];

      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));

      await act(async () => {
        render(<GenerationCounter />);
      });

      const downButton = screen.getByRole('button', {
        name: 'down',
      });
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');

      items.forEach((element, index) =>
        expect(element.textContent).toBe(generation[index])
      );

      fireEvent.click(downButton);

      const newItems = getAllByRole('listitem');

      newItems.forEach((element, index) => {
        expect(element.textContent).toBe(generation[index + 3]);
      });
    });
    it('After 3+ presses, it will remain in generation constraints', async () => {
      const generation = [
        'Generation i',
        'Generation ii',
        'Generation iii',
        'Generation iv',
        'Generation v',
        'Generation vi',
        'Generation vii',
        'Generation viii',
      ];

      fetchMock.mockResponseOnce(JSON.stringify(jsonObject));

      await act(async () => {
        render(<GenerationCounter />);
      });

      const downButton = screen.getByRole('button', {
        name: 'down',
      });
      const list = screen.getByRole('list');
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');

      items.forEach((element, index) =>
        expect(element.textContent).toBe(generation[index])
      );

      for (let i = 0; i < 5; i++) {
        fireEvent.click(downButton);
      }

      const newItems = getAllByRole('listitem');

      newItems.forEach((element, index) => {
        expect(element.textContent).toBe(generation[index + 6]);
      });
    });

    describe('Up Arrow', () => {
      const mockData =
        '{"count":8,"next":null,"previous":null,"results":' +
        '[{"name":"generation-i","url":"https://pokeapi.co/api/v2/generation/1/"},' +
        '{"name":"generation-ii","url":"https://pokeapi.co/api/v2/generation/2/"},' +
        '{"name":"generation-iii","url":"https://pokeapi.co/api/v2/generation/3/"},' +
        '{"name":"generation-iv","url":"https://pokeapi.co/api/v2/generation/4/"},' +
        '{"name":"generation-v","url":"https://pokeapi.co/api/v2/generation/5/"},' +
        '{"name":"generation-vi","url":"https://pokeapi.co/api/v2/generation/6/"},' +
        '{"name":"generation-vii","url":"https://pokeapi.co/api/v2/generation/7/"},' +
        '{"name":"generation-viii","url":"https://pokeapi.co/api/v2/generation/8/"}]}';

      const jsonObject = JSON.parse(mockData);

      beforeEach(() => {
        fetchMock.resetMocks();
      });

      it('moves generations count up 3', async () => {
        const generation = [
          'Generation i',
          'Generation ii',
          'Generation iii',
          'Generation iv',
          'Generation v',
          'Generation vi',
          'Generation vii',
          'Generation viii',
        ];

        fetchMock.mockResponseOnce(JSON.stringify(jsonObject));

        await act(async () => {
          render(<GenerationCounter />);
        });

        const downButton = screen.getByRole('button', {
          name: 'down',
        });
        const upButton = screen.getByRole('button', {
          name: 'up',
        });
        const list = screen.getByRole('list');
        const { getAllByRole } = within(list);
        const items = getAllByRole('listitem');

        items.forEach((element, index) =>
          expect(element.textContent).toBe(generation[index])
        );

        fireEvent.click(downButton);
        fireEvent.click(upButton);

        const newItems = getAllByRole('listitem');

        newItems.forEach((element, index) => {
          expect(element.textContent).toBe(generation[index]);
        });
      });
      it('Stays within constraints of generation list', async () => {
        const generation = [
          'Generation i',
          'Generation ii',
          'Generation iii',
          'Generation iv',
          'Generation v',
          'Generation vi',
          'Generation vii',
          'Generation viii',
        ];

        fetchMock.mockResponseOnce(JSON.stringify(jsonObject));

        await act(async () => {
          render(<GenerationCounter />);
        });

        const upButton = screen.getByRole('button', {
          name: 'up',
        });
        const list = screen.getByRole('list');
        const { getAllByRole } = within(list);
        const items = getAllByRole('listitem');

        items.forEach((element, index) =>
          expect(element.textContent).toBe(generation[index])
        );

        fireEvent.click(upButton);

        const newItems = getAllByRole('listitem');

        newItems.forEach((element, index) => {
          expect(element.textContent).toBe(generation[index]);
        });
      });
    });
  });
});
