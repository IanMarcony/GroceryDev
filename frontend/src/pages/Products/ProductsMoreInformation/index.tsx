import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import { Container, AnimationContainer } from './styles';

interface ProductParams {
  id: string;
}

interface IProduct {
  name: string;
  description: string;
  price: number;
}

const ProductsMoreInformation: React.FC = () => {
  const { params } = useRouteMatch<ProductParams>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    api
      .get('/products/single', {
        data: {
          id: params.id,
        },
      })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        addToast({
          title: 'Erro ao buscar produto',
          type: 'error',
        });
        setLoading(false);
      });
  }, [params.id, addToast]);
  if (loading) {
    return (
      <Container>
        <AnimationContainer>
          <CircularProgress size={40} color="primary" />
        </AnimationContainer>
      </Container>
    );
  }
  return (
    <Container>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <span>Preço: R${product?.price.toFixed(2)}</span>
    </Container>
  );
};

export default ProductsMoreInformation;
