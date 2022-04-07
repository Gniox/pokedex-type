import { sortPokemon } from '../functions/sortPokemon';

describe('sortPokemon', () => {
  const mockData =
    '{"pokemon_species":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon-species/1/"},' +
    '{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon-species/4/"},' +
    '{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-species/7/"},' +
    '{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon-species/10/"},' +
    '{"name":"nidoran-m","url":"https://pokeapi.co/api/v2/pokemon-species/32/"},' +
    '{"name":"vulpix","url":"https://pokeapi.co/api/v2/pokemon-species/37/"},' +
    '{"name":"zubat","url":"https://pokeapi.co/api/v2/pokemon-species/41/"},' +
    '{"name":"oddish","url":"https://pokeapi.co/api/v2/pokemon-species/43/"},' +
    '{"name":"paras","url":"https://pokeapi.co/api/v2/pokemon-species/46/"},' +
    '{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon-species/13/"},' +
    '{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon-species/16/"},' +
    '{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon-species/19/"},' +
    '{"name":"spearow","url":"https://pokeapi.co/api/v2/pokemon-species/21/"},' +
    '{"name":"ekans","url":"https://pokeapi.co/api/v2/pokemon-species/23/"},' +
    '{"name":"sandshrew","url":"https://pokeapi.co/api/v2/pokemon-species/27/"},' +
    '{"name":"nidoran-f","url":"https://pokeapi.co/api/v2/pokemon-species/29/"},' +
    '{"name":"venonat","url":"https://pokeapi.co/api/v2/pokemon-species/48/"},' +
    '{"name":"diglett","url":"https://pokeapi.co/api/v2/pokemon-species/50/"},' +
    '{"name":"meowth","url":"https://pokeapi.co/api/v2/pokemon-species/52/"}]}';

  const expectedData =
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

  const jsonObjectUnsorted = JSON.parse(mockData);
  const jsonObjectSorted = JSON.parse(expectedData);
  const pokeArray = jsonObjectUnsorted.pokemon_species;
  const expectedArray = jsonObjectSorted.pokemon_species;

  it('sorts poke array by url', () => {
    const sortedPokemon = sortPokemon(pokeArray);

    for (let i = 0; i < expectedArray.length; i++) {
      expect(sortedPokemon[i].name).toBe(expectedArray[i].name);
    }
  });
});
