import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100vh;
  margin: 0 auto;

  h1 {
    font-size: 30px;
    text-align: start;
  }

  p {
    margin-top: 10px;
    font-size: 20px;
    text-align: center;
  }

  span {
    margin-top: 10px;
    font-size: 20px;
  }
`;

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
`;
