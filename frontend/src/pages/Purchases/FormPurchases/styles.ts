import styled from 'styled-components';

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
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;

    button {
      width: 100%;
    }
  }

  select {
    flex: 1;
    & + select {
      margin-top: 10px;
    }
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
