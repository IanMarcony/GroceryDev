import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';

import { Container } from './styles';

interface ProductState {
  id?: string;
  name: string;
  description: string;
  price: number;
}

const FormProducts: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [product, setProduct] = useState<ProductState>({} as ProductState);

  const history = useHistory();

  const { search } = useLocation();

  const id = new URLSearchParams(search).get('id');

  const { addToast } = useToast();

  useEffect(() => {
    api
      .get('/products/single', {
        data: {
          id,
        },
      })
      .then((response) => {
        setProduct(response.data);
      });
  }, [id]);

  const handleSubmit = useCallback(
    async (data: ProductState) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string().notRequired(),
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          price: Yup.number()
            .min(0, 'Número acima de 0')
            .required('Preço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { price, description, name } = data;

        if (id) {
          await api.put('/products', {
            id: data.id,
            price,
            description,
            name,
          });
        } else {
          await api.post('/products', {
            price,
            description,
            name,
          });
        }
        addToast({
          type: 'success',
          title: id ? 'Atualizado com sucesso' : 'Criado com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: id ? 'Erro ao atualizar' : 'Erro ao criar',
          description: id
            ? 'Ocorreu um erro ao editar os dados'
            : 'Erro ao criar',
        });
      }
    },
    [addToast, id, history],
  );
  return (
    <Container>
      <Form ref={formRef} style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        {id ? <h1>Edite o produto</h1> : <h1>Crie um produto</h1>}

        {id && (
          <Input
            name="id"
            type="text"
            style={{ marginTop: '10px', cursor: 'none' }}
            value={id}
            contentEditable={false}
          />
        )}
        <Input
          name="name"
          type="text"
          value={product.name}
          placeholder="Nome"
        />
        <TextArea
          name="description"
          value={product.description}
          placeholder="Descrição"
        />
        <Input
          name="price"
          type="text"
          value={product.price.toFixed(2)}
          min={0}
          placeholder="Preço"
        />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default FormProducts;
