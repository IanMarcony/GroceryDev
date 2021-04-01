import styled, { keyframes } from 'styled-components';

import backgroundImage from '../../assets/images/supermarket-people.jpg';

const appearFromDown = keyframes`
  from{
    opacity: 0;
    transform: translateY(50px);

  }

  to{
    opacity: 1;
    transform: translateY(0);
  }

`;

export const AnimationContainer = styled.div`
  text-align: center;
  animation: ${appearFromDown} 1s;

  h1 {
    margin-top: 20px;
    font-size: 70px;
  }

  p {
    margin-top: 10px;
    font-size: 20px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100vh;
  margin: 0 auto;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: bottom;
`;
