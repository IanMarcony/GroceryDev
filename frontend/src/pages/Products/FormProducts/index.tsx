import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import ReactModal from 'react-modal';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import { useFormType } from '../../../hooks/formType';

import { Container } from './styles';

interface ProductState {
  id?: string;
  name: string;
  description: string;
  price: string;
}

const FormProducts: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { getFormType } = useFormType();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProductState) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string().notRequired(),
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          price: Yup.number().required('Preço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { id, price, description, name } = data;

        if (getFormType().type === 'edit') {
          await api.put('/products', {
            id,
            price,
            description,
            name,
          });
        } else {
          await api.put('/products', {
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
          title:
            getFormType().type === 'edit'
              ? 'Erro ao atualizar'
              : 'Erro ao criar',
          description:
            getFormType().type === 'edit'
              ? 'Ocorreu um erro ao editar os dados'
              : 'Erro ao criar',
        });
      }
    },
    [addToast, getFormType],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {getFormType().type === 'edit' ? (
          <h1>Edite o produto</h1>
        ) : (
          <h1>Crie um produto</h1>
        )}

        {getFormType().id && (
          <Input
            name="id"
            type="text"
            value={getFormType().id}
            contentEditable={false}
          />
        )}
        <Input name="name" type="text" placeholder="Nome" />
        <TextArea name="description" placeholder="Descrição" />
        <Input name="price" type="number" min={0} placeholder="Preço" />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default FormProducts;
