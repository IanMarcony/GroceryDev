import React, { useState, useCallback, useEffect } from 'react';

import { FiDelete, FiMoreVertical, FiPenTool } from 'react-icons/fi';

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
  const { addToast } = useToast();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products/all');

      setProducts([...data]);

      addToast({ title: 'Carregado todos os produtos' });
    }

    loadProducts();
  }, []);

  const handleAlter = useCallback(async (id: string) => {}, []);
  const handleDelete = useCallback(async (id: string) => {}, []);
  const handleMoreInformation = useCallback((id: string) => {}, []);

  return (
    <Container>
      <AnimationContainer>
        <h1>Produtos</h1>
      </AnimationContainer>

      <ListProducts>
        {products.map((product) => (
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
              <button type="button" onClick={() => handleDelete(product.id)}>
                <Tooltip title="Deletar">
                  <FiDelete size={20} />
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
    </Container>
  );
};

export default Products;
