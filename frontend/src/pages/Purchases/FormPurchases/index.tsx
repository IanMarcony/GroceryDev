/* eslint-disable no-plusplus */
import React, { useCallback, useState, useEffect } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@material-ui/core';
// import { FormHandles } from '@unform/core';
// import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
// import Input from '../../../components/Input';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Button from '../../../components/Button';
// import SelectS from '../../../components/SelectS';
import { Container, ProductContainer, InputF } from './styles';

interface PurchaseState {
  id?: string;
  products_id?: string[];
  products?: ProductState[];
  status?: string;
  total?: number;
  pay_type?: string;
}

interface ProductState {
  id: string;
  name: string;
  price: number;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormPurchases: React.FC = () => {
  // const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const [status, setStatus] = useState('');
  const [pay_type, setPayType] = useState('');

  const [products, setProducts] = useState<ProductState[]>([]);
  const [selectedProductsId, setSelectedProductsId] = useState<string[]>([]);
  const [totalP, setTotalP] = useState(0);

  const history = useHistory();

  const { search } = useLocation();

  const id = new URLSearchParams(search).get('id');
  useEffect(() => {
    if (!id) return;
    api
      .get<PurchaseState>(`/purchases/single?id=${id}`)
      .then((response) => {
        setPayType(response.data.pay_type ? response.data.pay_type : '');
        setStatus(response.data.status ? response.data.status : '');

        setSelectedProductsId(
          response.data.products
            ? response.data.products.map((product) => product.id)
            : [],
        );

        setTotalP(response.data.total ? response.data.total : 0);
      })
      .catch((error) => {
        addToast({
          type: 'error',
          title: 'Erro ao buscar produto',
        });
      });
  }, [id, addToast, products, selectedProductsId]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products/all');
        setProducts([...data]);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na conexão',
          description: 'Ocorreu um erro na comunicação com o servidor',
        });
        history.push('/purchases');
      }
    }

    loadProducts();
  }, [addToast, history]);

  const handleSubmit = useCallback(async () => {
    if (selectedProductsId.length === 0) {
      return addToast({
        type: 'error',
        title: 'Necessário selecionar produto',
      });
    }
    try {
      if (id) {
        await api.put('/purchases', {
          id,
          products_id: selectedProductsId,
          pay_type,
          status,
        });
      } else {
        await api.post('/purchases', {
          products_id: selectedProductsId,
          pay_type,
        });
      }

      history.push('/purchases');
    } catch {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao se cadastrar',
      });
    }
  }, [addToast, id, history, pay_type, status, selectedProductsId]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const array = event.target.value as string[];
      setSelectedProductsId(array);
      // console.log(`SelectedId: `, array);
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        const p = products.find((product) => product.id === array[i]);
        sum += p ? p.price : 0;
      }
      setTotalP(sum);
    },
    [products],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {id ? <h1>Edite a compra</h1> : <h1>Crie uma compra</h1>}

        {id && (
          <InputF name="id" type="text" value={id} contentEditable={false} />
        )}

        <FormControl>
          <InputLabel id="demo-mutiple-checkbox-label">Produtos</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selectedProductsId}
            onChange={handleChange}
            input={<InputF name="products" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
            MenuProps={MenuProps}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                <Checkbox checked={products.indexOf(product) > -1} />
                <ProductContainer>
                  <strong>{product.name}</strong>
                  <p>Preço: {product.price}</p>
                </ProductContainer>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span>Total:{totalP}</span>

        <select
          name="pay_type"
          onChange={(event) => setPayType(event.target.value)}
        >
          <option value="cash">Dinheiro</option>
          <option value="credit card">Cartão de Crédito</option>
          <option value="debit card">Cartão de Débito</option>
        </select>

        {id && (
          <select
            name="status"
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="ABERTO">ABERTO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
        )}

        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
};

export default FormPurchases;
