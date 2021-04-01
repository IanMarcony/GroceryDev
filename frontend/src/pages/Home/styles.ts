import styled, { keyframes } from 'styled-components';

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
  height: 100%;

  h1 {
    margin-top: 20px;
    font-size: 70px;
  }

  p {
    margin-top: 10px;
    font-size: 20px;
  }

  img {
    width: 50%;
    height: 50%;
    margin-top: auto;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100vh;
  margin: 0 auto;
`;
