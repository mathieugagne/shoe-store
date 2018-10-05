import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.text.color};
    font-family: ${props => props.theme.text.fontFamily};
    font-size: ${props => props.theme.text.fontSize}px;
  }
  a {
    color: ${props => props.theme.text.color};
    text-decoration: none;
  }
`;
