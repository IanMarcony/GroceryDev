import React, { useState, useCallback, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import { FiDelete, FiMoreVertical, FiPenTool, FiPlus } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import ProductIcon from '../../assets/images/box.svg';

import Tooltip from '../../components/Tooltip';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import {
  Container,
  AnimationContainer,
  ListProducts,
  GroupOptions,
  InformationProduct,
} from './styles';

interface IProduct {
  id: string;
  name: string;
  description: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    async function loadProducts() {
      try {
        const { data } = await api.get('/products/all');

        setProducts([...data]);
      } catch (err) {
        addToast({
          title: 'Occoreu algum erro',
          description: 'Falha na comunicação com o servidor',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [addToast]);

  const handleAlter = useCallback(
    (id: string) => {
      history.push(`/form_products?id=${id}`);
    },
    [history],
  );
  const handleDelete = useCallback(
    async (id: string, index: number) => {
      await api.delete('/products', {
        data: {
          id,
        },
      });
      setProducts((state) => state.splice(index, 1));
      addToast({
        title: 'Deletado com sucesso',

        type: 'success',
      });
    },
    [addToast],
  );
  const handleMoreInformation = useCallback(
    (id: string) => {
      history.push(`/info_product/${id}`);
    },
    [history],
  );

  const handleCreate = useCallback(() => {
    history.push('/form_products?type=create');
  }, [history]);

  if (loading) {
    return (
      <Container>
        <AnimationContainer>
          <h1>Produtos</h1>
          <CircularProgress size={40} color="primary" />
        </AnimationContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AnimationContainer>
        <h1>Produtos</h1>
      </AnimationContainer>
      <button
        type="button"
        onClick={handleCreate}
        style={{
          background: 'transparent',
          outline: 'none',
          border: 'none',
        }}
      >
        <FiPlus size={30} color="#385a64" />
      </button>
      {products.length > 0 ? (
        <>
          <ListProducts>
            {products.map((product, index) => (
              <div key={product.id}>
                <img src={ProductIcon} alt={product.id} />
                <InformationProduct>
                  <strong>{product.name}</strong>
                  <p>{product.description}</p>
                </InformationProduct>
                <GroupOptions>
                  <button type="button" onClick={() => handleAlter(product.id)}>
                    <Tooltip title="Editar">
                      <FiPenTool size={20} />
                    </Tooltip>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id, index)}
                  >
                    <Tooltip title="Deletar">
                      <FiDelete size={20} color="#c53030" />
                    </Tooltip>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoreInformation(product.id)}
                  >
                    <Tooltip title="Mais informações">
                      <FiMoreVertical size={20} />
                    </Tooltip>
                  </button>
                </GroupOptions>
              </div>
            ))}
          </ListProducts>
        </>
      ) : (
        <AnimationContainer>
          <h1 style={{ fontSize: '20px' }}>Sem produtos!</h1>
        </AnimationContainer>
      )}
    </Container>
  );
};

export default Products;
