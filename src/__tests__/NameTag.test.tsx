import React from 'react';
import NameTag from '../components/Body/NameTag';
import { render, screen } from '@testing-library/react';

describe('NameTag', () => {
  const argument = {
    name: 'bulbasaur',
    flavorText:
      'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
    pokemon: 1,
  };

  it('displays pokemon name correctly', () => {
    render(
      <NameTag
        name={argument.name}
        flavorText={argument.flavorText}
        pokemon={argument.pokemon}
      />
    );

    const pokeName = screen.getByRole('heading', {
      level: 1,
    });

    expect(pokeName.textContent).toBe(argument.name);
  });
});
