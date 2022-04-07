import { createGlobalStyle } from 'styled-components';

type color = {
  current: string;
};

//TODO: stop loadin from flashbanging
//TODO: Make font sizes change (media query)

export default createGlobalStyle<color>`
  @font-face {
    font-family: Roboto-Bold;
    src: url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2);
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: Roboto-Bold;
    color: white;
  }

  h1 {
    font-weight: bold;
    font-size: 48px;
  }

  body {
    width: 100%;
    height: 100vh;
    transition: background-color 3s;
    background-color:${(props) => props.current};
  }
`;
