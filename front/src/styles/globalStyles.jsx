import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    word-wrap: break-word;
  }
  @font-face {
    font-family: 'MinSans-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'MinSans-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body{
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 1.2;
  }
`;

export default GlobalStyle;
