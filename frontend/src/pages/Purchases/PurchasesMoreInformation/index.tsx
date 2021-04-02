import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import ProductIcon from '../../../assets/images/box.svg';

import {
  Container,
  AnimationContainer,
  ListProducts,
  InformationProduct,
} from './styles';

interface PurchaseParams {
  id: string;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
}

interface IPurchase {
  id: string;
  total: number;
  status: string;
  pay_type: string;
  products: IProduct[];
}

const PurchasesMoreInformation: React.FC = () => {
  const { params } = useRouteMatch<PurchaseParams>();
  const [purchase, setPurchase] = useState<IPurchase | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/purchases/single?id=${params.id}`)
      .then((response) => {
        setPurchase(response.data);
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
      <h1>Compra: {purchase?.id}</h1>
      <span>Total: R${purchase?.total.toFixed(2)}</span>
      <span>Status: R${purchase?.status}</span>
      <span>Tipo de pagamento: R${purchase?.pay_type}</span>

      <ListProducts>
        {purchase?.products.map((product) => (
          <div key={product.id}>
            <img src={ProductIcon} alt={product.id} />
            <InformationProduct>
              <strong>{product.name}</strong>
              <p>Preço: {product.price}</p>
            </InformationProduct>
          </div>
        ))}
      </ListProducts>
    </Container>
  );
};

export default PurchasesMoreInformation;
