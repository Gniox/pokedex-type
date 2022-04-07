type pokeSpecies = {
  name: string;
  url: string;
};

// function getPokemonValue(currentPokemon:pokeSpecies, )

//TODO: figure out a way to sort pokemon array by url
//Sorts array of PokeSpecies by url(number)
//insert sort 
export function sortPokemon(pokemon: pokeSpecies[]): pokeSpecies[] {
  for (let i = 1; i < pokemon.length; i++) {
    let previousIndex = i - 1;
    let currentIndex = i;
    let previousPokeURLSplit = pokemon[previousIndex].url.split('/');
    let currentPokeURLSplit = pokemon[currentIndex].url.split('/');

    while (
      parseInt(currentPokeURLSplit[currentPokeURLSplit.length - 2]) <
      parseInt(previousPokeURLSplit[previousPokeURLSplit.length - 2])
    ) {
      const temp = pokemon[previousIndex];

      pokemon[previousIndex] = pokemon[currentIndex];
      pokemon[currentIndex] = temp;

      previousIndex--;
      currentIndex--;

      previousPokeURLSplit = pokemon[previousIndex].url.split('/');
      currentPokeURLSplit = pokemon[currentIndex].url.split('/');
    }
  }

  return pokemon;
}
