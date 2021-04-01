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

export const ListProducts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  margin-top: 30px;
  justify-content: center;
  animation: ${appearFromDown} 1s;

  > div {
    background: #fff;
    border-radius: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: #385a64;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;

    & + div {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
    }
  }
`;

export const InformationProduct = styled.div`
  display: block;
  margin: 0 16px;
  flex: 1;

  strong {
    text-align: start;
    font-size: 20px;
    color: #3d3d4d;
  }
  p {
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
  }
`;
