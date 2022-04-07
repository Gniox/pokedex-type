export function formatNumber(pokeNumber: string) {
  if (parseInt(pokeNumber) < 10) {
    pokeNumber = '00' + pokeNumber;
  } else if (parseInt(pokeNumber) < 100) {
    pokeNumber = '0' + pokeNumber;
  }

  return pokeNumber;
}

export function getPokeNumber(url: string) {
  const splitPokeURL = url.split('/');
  const pokeNumber = splitPokeURL[splitPokeURL.length - 2];
  const formattedNumber = formatNumber(pokeNumber);

  return formattedNumber;
}
