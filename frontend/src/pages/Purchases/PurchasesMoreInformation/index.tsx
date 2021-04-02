import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import ProductIcon from '../../../assets/images/box.svg';

import { Container, ListProducts, InformationProduct } from './styles';

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
  const [purchase, setPurchase] = useState<IPurchase>({} as IPurchase);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    console.log(params.id);
    api
      .get(`/purchases/single?id=${params.id}`)
      .then((response) => {
        console.log(response.data);
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

  return (
    <Container>
      <h1>Compra: {purchase.id}</h1>
      <p>Total: R${purchase.total.toFixed(2)}</p>
      <p>Status: R${purchase.status}</p>
      <p>Tipo de pagamento: R${purchase.pay_type}</p>

      <ListProducts>
        {purchase.products.map((product) => (
          <div key={product.id}>
            <img src={ProductIcon} alt={product.id} />
            <InformationProduct>
              <strong>{product.name}</strong>
              <p>Preço: {product.price}</p>
            </InformationProduct>
          </div>
        ))}
      </ListProducts>

      {loading && <CircularProgress size={40} color="primary" />}
    </Container>
  );
};

export default PurchasesMoreInformation;
