import React from 'react';

import { Container, AnimationContainer } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>Grocery Dev</h1>
        <p>A sua loja de desenvolvedor favorita</p>
      </AnimationContainer>
    </Container>
  );
};

export default Home;
