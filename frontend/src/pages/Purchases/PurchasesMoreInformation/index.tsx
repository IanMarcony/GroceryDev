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

  status: string;
  pay_type: string;
  products: IProduct[];
}

const PurchasesMoreInformation: React.FC = () => {
  const { params } = useRouteMatch<PurchaseParams>();
  const [purchase, setPurchase] = useState<IPurchase>({} as IPurchase);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/purchases/single?id=${params.id}`)
      .then((response) => {
        setPurchase(response.data);

        setTotal(response.data.total);

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
        <CircularProgress size={40} color="primary" />
      </Container>
    );
  }

  return (
    <Container>
      {/* {!loading ? (
        <> */}
      <h1>Compra: {purchase.id}</h1>
      <p>Total: R${total.toFixed(2)}</p>
      <p>Status: {purchase.status}</p>
      <p>Tipo de pagamento: {purchase.pay_type}</p>

      <ListProducts>
        {purchase.products &&
          purchase.products.map((product) => (
            <div key={product.id}>
              <img src={ProductIcon} alt={product.id} />
              <InformationProduct>
                <strong>{product.name}</strong>
                <p>Preço: {product.price}</p>
              </InformationProduct>
            </div>
          ))}
      </ListProducts>
      {/* </>
      ) : null} */}
    </Container>
  );
};

export default PurchasesMoreInformation;
