import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { useRouteMatch } from 'react-router-dom';
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
  price: string;
}

interface IProductsParams {
  id?: string;
}

const FormProducts: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { params } = useRouteMatch<IProductsParams>();

  const { addToast } = useToast();

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

        const { id, price, description, name } = data;

        if (params.id) {
          await api.put('/products', {
            id,
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: params.id ? 'Erro ao atualizar' : 'Erro ao criar',
          description: params.id
            ? 'Ocorreu um erro ao editar os dados'
            : 'Erro ao criar',
        });
      }
    },
    [addToast, params.id],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {params.id ? <h1>Edite o produto</h1> : <h1>Crie um produto</h1>}

        {params.id && (
          <Input
            name="id"
            type="text"
            value={params?.id}
            contentEditable={false}
          />
        )}
        <Input name="name" type="text" placeholder="Nome" />
        <TextArea name="description" placeholder="Descrição" />
        <Input name="price" type="text" min={0} placeholder="Preço" />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default FormProducts;
