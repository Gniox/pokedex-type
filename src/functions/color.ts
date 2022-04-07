//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function colorStringToHex(stringInput: string) {
  let hash = 0;
  for (let i = 0; i < stringInput.length; i++) {
    hash = stringInput.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function getRandom() {
  let num = Math.floor(Math.random() * 15 + 1);
  num *= Math.round(Math.random()) ? 1 : -1;

  return num;
}

//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function getHsl(stringInput: string, saturation: number, light: number) {
  const stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.charCodeAt(0) + acc;
  }, 0);

  //TODO: needs to be between 0 and 360... -> check
  const hValue = (stringUniqueHash % 360) + getRandom();

  const hsl = {
    h: hValue,
    s: saturation,
    l: light,
  };

  // `hsl(${stringUniqueHash % 360}, 95%, ${light}%)`
  return hsl;
}

// https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

interface rgb {
  r: number;
  g: number;
  b: number;
}

function calculateCorrectedRatios(rgbRatios: number[]) {
  const correctedRatios: number[] = [];

  rgbRatios.forEach((item, index) => {
    let componentValue = 1;
    if (index === 0) {
      componentValue = 0.2126;
    } else if (index === 1) {
      componentValue = 0.7152;
    } else {
      componentValue = 0.0722;
    }
    if (item < 0.03928) {
      const value = (item / 12.92) * componentValue;
      correctedRatios.push(value);
    } else {
      const value = (item + 0.055) / 1.055;
      const next = Math.pow(value, 2.4);
      const final = next * componentValue;
      correctedRatios.push(final);
    }
  });

  return correctedRatios;
}

function rgbLuminance(rgb: rgb) {
  const rgbRatios = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  const correctedRatios: number[] = calculateCorrectedRatios(rgbRatios);
  // console.log(correctedRatios);
  const initialValue = 0;
  const luminance = correctedRatios.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return luminance;
}

function calculateContrastRatio(textLuminance: number, bgLuminance: number) {
  const contrastRatio = (textLuminance + 0.05) / (bgLuminance + 0.05);

  return contrastRatio;
}

function calculateLuminance(color: string, saturation: number, light: number) {
  const hsl = getHsl(color, saturation, light);
  // const hexColor = colorStringToHex(color);

  const hexColor = hslToHex(hsl.h, hsl.s, hsl.l);
  // console.log(hsl);
  // console.log('hexcolor ' + hexColor);
  const rgb = hexToRgb(hexColor) ?? { r: 255, b: 255, g: 255 };
  // console.log(rgb);
  const luminance = rgbLuminance(rgb);
  const hexAndLuminance = {
    hex: hexColor,
    luminance: luminance,
  };

  return hexAndLuminance;
}

//TODO: work in progress...
export function getContrastColor(color: string, light?: number) {
  // console.log(color);
  light = 75;
  const saturation = 80;
  let hexAndLuminance = calculateLuminance(color, saturation, light);
  const textLuminance = calculateLuminance('white', 100, 100);

  // console.log('bg color: ' + hexAndLuminance.hex);
  // console.log('text color: ' + textLuminance.luminance);
  // console.log('contrast value ' + value);

  while (
    calculateContrastRatio(textLuminance.luminance, hexAndLuminance.luminance) <
    7
  ) {
    light -= 5;
    hexAndLuminance = calculateLuminance(color, saturation, light);
    if (light === 0) break;
  }

  // console.log(
  //   calculateContrastRatio(textLuminance.luminance, hexAndLuminance.luminance)
  // );
  return hexAndLuminance.hex;
}
