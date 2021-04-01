import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  display: flex;

  position: absolute;

  top: 0px;
  left: 0px;

  margin: 10px;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);

  }

  to{
    opacity: 1;
    transform: translateX(0);
  }

`;

export const Burger = styled.button`
  border: none;
  background: transparent;
  border-radius: 50%;
  animation: ${appearFromLeft} 0.3s;

  transition: opacity 0.4s;

  padding: 4px;
  &:hover {
    opacity: 0.6;
  }
`;

export const ButtonsContainer = styled.nav`
  position: absolute;
  top: 0px;
  left: 0px;
  animation: ${appearFromLeft} 0.4s;

  display: flex;
  flex-direction: column;
  width: 100px;
  height: max-content;
  border-radius: 4px;

  padding: 10px;
  box-shadow: 9px 5px 22px -2px rgba(0, 0, 0, 0.61);
  -webkit-box-shadow: 9px 5px 22px -2px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 9px 5px 22px -2px rgba(0, 0, 0, 0.61);
  a {
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    border-radius: 3px;

    align-items: stretch;
    padding: 4px;
    color: #fff;
    background-color: #477994;

    & + a {
      margin-top: 10px;
    }

    &:hover {
      background-color: ${shade(0.2, '#477994')};
    }
  }
`;
