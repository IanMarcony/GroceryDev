import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }

  #root{
    display: flex;    
    
  }

  body{
    background:#FFF;
    color:#477994;
    -webkit-font-smoothing:antialiased;
  }
  body,input, button{
    font-family: 'Roboto', serif;
    font-size:16px;
  }
  h1,h2,h3,h4,h5,h6,strong{
    font-weight:700;
  }
  button,a {
    cursor:pointer;
  }
`;
