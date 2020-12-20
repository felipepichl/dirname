import { createGlobalStyle } from 'styled-components';

import background from '../assets/images/background.jpg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  @import url("https://fonts.googleapis.com/css?family=Signika:300,700");
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    /* @media screen and (max-width: 480px) {
      body {
        min-width: 320px;
      }
    } */
  }

  body {
    background: #191920 url(${background}) no-repeat center fixed;

    background-size: cover;
    -webkit-background-size: cover;
    -mo-background-size: cover;
    -o-background-size: cover;

    -webkit-font-smoothing: antialiased;
    font: 14px Roboto, sans-serif;

  }

`;
