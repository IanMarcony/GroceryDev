import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 30px;
  }

  p {
    margin-top: 10px;
    font-size: 20px;
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
