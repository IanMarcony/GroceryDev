import styled from 'styled-components';

import { Input } from '@material-ui/core';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  padding-top: 15px;

  align-items: center;

  > form {
    /* width: 100%; */
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;

    button {
      width: 100%;
      height: 50px;
    }
  }

  select {
    width: 100%;
    height: 50px;
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;

    margin-top: 10px;
  }
`;

export const InputF = styled(Input)`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  &:focus {
    border-color: #ff9000;
    color: #ff9000;
  }

  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
