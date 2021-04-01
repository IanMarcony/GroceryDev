import React from 'react';
import backgroundImage from '../../assets/images/supermarket-people.jpg';

import { Container, AnimationContainer } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <AnimationContainer>
        <h1>Grocery Dev</h1>
        <p>A sua loja de desenvolvedor favorita</p>
        <img src={backgroundImage} alt="pessoas no supermercado" />
      </AnimationContainer>
    </Container>
  );
};

export default Home;
