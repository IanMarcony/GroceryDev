import React, { useCallback, useState, useEffect } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@material-ui/core';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Button from '../../../components/Button';
import SelectS from '../../../components/SelectS';
import { Container, ProductContainer } from './styles';

interface PurchaseState {
  id?: string;
  products_id: string[];
  status?: string;
  total?: number;
  pay_type: string;
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

interface IPurchasesParams {
  id?: string;
}

const FormPurchases: React.FC = () => {
  const { addToast } = useToast();
  const [purchase, setPurchase] = useState<PurchaseState>({} as PurchaseState);

  const [products, setProducts] = useState<ProductState[]>([]);
  const [selectedProductsId, setSelectedProdutsId] = useState<string[]>([]);
  const [selectedProducts, setSelectedProduts] = useState<ProductState[]>([]);

  const history = useHistory();

  const { search } = useLocation();

  const id = new URLSearchParams(search).get('id');
  useEffect(() => {
    if (!id) return;
    api
      .get(`/purchases/single?id=${id}`)
      .then((response) => {
        setPurchase(response.data);

        setSelectedProdutsId([response.data.products_id]);

        const selects = [] as ProductState[];
        // eslint-disable-next-line no-plusplus
        for (let indexP = 0; indexP < selectedProductsId.length; indexP++) {
          const idP = selectedProductsId[indexP];
          const aux = products.findIndex(
            (findProduct) => findProduct.id === idP,
          );
          selects.push(products[aux]);
        }

        setSelectedProduts([...selects]);
      })
      .catch((error) => {
        addToast({
          type: 'error',
          title: 'Erro ao buscar produto',
        });
      });
  }, [id, addToast, products]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products/all');

        setProducts([...data]);

        addToast({ title: 'Carregado todos os produtos' });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na conexão',
          description: 'Ocorreu um erro na comunicação com o servidor',
        });
      }
    }

    loadProducts();
  }, [addToast]);

  const handleSubmit = useCallback(async () => {
    if (selectedProductsId.length === 0) {
      addToast({
        type: 'error',
        title: 'Necessário selecionar produto',
      });
      return;
    }
    const { products_id, pay_type, status } = purchase;
    if (id) {
      await api.put('/purchases', {
        id,
        products_id,
        pay_type,
        status,
      });
    } else {
      await api.post('/purchases', {
        products_id,
        pay_type,
      });
    }

    history.push('/purchases');
  }, [addToast, id, purchase, history, selectedProductsId.length]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      console.log(event.target.value);
      setSelectedProdutsId(event.target.value as string[]);
      const index = products.findIndex(
        (findProduct) => findProduct.id === event.target.value,
      );
      setSelectedProduts((state) => [products[index], ...state]);
    },
    [products],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {id ? <h1>Edite a compra</h1> : <h1>Crie uma compra</h1>}

        {id && (
          <Input name="id" type="text" value={id} contentEditable={false} />
        )}

        <FormControl>
          <InputLabel id="demo-mutiple-checkbox-label">Produtos</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selectedProductsId}
            onChange={handleChange}
            input={<Input name="products" />}
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
        <span>
          Total:
          {selectedProducts.reduce(
            (total, product) => total + product.price,
            0,
          )}
        </span>

        <SelectS
          name="pay_type"
          onChange={(event) =>
            setPurchase({
              pay_type: event.target.value,
              products_id: purchase.products_id,
            })
          }
        >
          <option value="cash">Dinheiro</option>
          <option value="credit card">Cartão de Crédito</option>
          <option value="debit card">Cartão de Débito</option>
        </SelectS>

        {id && (
          <SelectS
            name="status"
            onChange={(event) =>
              setPurchase({
                status: event.target.value,
                ...purchase,
              })
            }
          >
            <option value="ABERTO">ABERTO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </SelectS>
        )}

        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
};

export default FormPurchases;
