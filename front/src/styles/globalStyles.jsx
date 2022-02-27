import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    word-break: keep-all;
    -ms-overflow-style: none;
    font-size: 16px;
  }
  ::-webkit-scrollbar {
  display: none;
}
  @font-face {
  font-family: 'BMHANNAPro';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff');
  font-weight: normal;
  font-style: normal;
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
  html{
    font-family: 'MinSans-Regular', 'sans-serif';
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 1.2;
    background-color: ${({ theme }) => theme.color.background};
  }
  img{
    width: 100%;
    height:100%;
  }
  button{
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    cursor: pointer;
  }
  textarea:focus,
  button:focus,
  input:focus,
  select:focus,
  svg:focus {
    outline: none;
  }
`;

export default GlobalStyle;
