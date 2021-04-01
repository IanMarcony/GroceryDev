import React, { useCallback, useState, useEffect } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Input,
} from '@material-ui/core';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { useFormType } from '../../../hooks/formType';

import { Container } from './styles';

interface PurchaseState {
  id?: string;
  products: string[];
  status?: string;
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

const FormPurchases: React.FC = () => {
  const { getFormType } = useFormType();
  const { addToast } = useToast();
  const [purchase, setPurchase] = useState<PurchaseState>({} as PurchaseState);
  const [products, setProducts] = useState<ProductState[]>([]);
  const [selectedProducts, setSelectedProduts] = useState<ProductState[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products/all');

        setProducts([...data]);

        addToast({ title: 'Carregado todos os produtos' });
      } catch {
        console.log('error');
      }
    }

    loadProducts();
  }, []);

  // const handleLoadProducts = useCallback(async () => {}, []);

  const handleSubmit = useCallback(async () => {
    // try {
    //   formRef.current?.setErrors({});
    //   const schema = Yup.object().shape({
    //     id: Yup.string().notRequired(),
    //     name: Yup.string().required('Nome obrigatório'),
    //     description: Yup.string().required('Descrição obrigatória'),
    //     price: Yup.number().required('Preço obrigatório'),
    //   });
    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     const errors = getValidationErrors(err);
    //     formRef.current?.setErrors(errors);
    //     return;
    //   }
    //   addToast({
    //     type: 'error',
    //     title: 'Erro na autenticação',
    //     description:
    //       'Ocorreu um erro ao fazer login, verifique as credenciais',
    //   });
    // }
  }, [addToast]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      console.log(event.target.value);
      // setSelectedProduts(event.target.value as string[]);
    },
    [],
  );

  return (
    <Container>
      <form onSubmit={() => handleSubmit}>
        {getFormType().type === 'edit' ? (
          <h1>Edite a compra</h1>
        ) : (
          <h1>Crie uma compra</h1>
        )}

        {getFormType().id && (
          <input type="text" value={getFormType().id} contentEditable={false} />
        )}

        <FormControl>
          <InputLabel id="demo-mutiple-checkbox-label">Produtos</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={products}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (selected as string[]).join(', ')}
            MenuProps={MenuProps}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                <Checkbox checked={products.indexOf(product) > -1} />
                <div>
                  <strong>{product.name}</strong>
                  <p>Preço: {product.price}</p>
                </div>
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

        <select>
          <option value="cash">Dinheiro</option>
          <option value="credit card">Cartão de Crédito</option>
          <option value="debit card">Cartão de Débito</option>
        </select>

        {getFormType().type === 'edit' && (
          <select>
            <option value="ABERTO">ABERTO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
        )}

        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
};

export default FormPurchases;
