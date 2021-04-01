import React, { useCallback, useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, ButtonsContainer, Burger } from './styles';

const MenuContainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Container>
      {!open && (
        <Burger type="button" onClick={handleClick}>
          <FaAlignJustify size={30} color="#477994" />
        </Burger>
      )}
      {open && (
        <ButtonsContainer>
          <Link to="/" onClick={handleClose}>
            Home
          </Link>
          <Link to="/products" onClick={handleClose}>
            Produtos
          </Link>
          <Link to="/purchases" onClick={handleClose}>
            Compras
          </Link>
        </ButtonsContainer>
      )}
    </Container>
  );
};

export default MenuContainer;
