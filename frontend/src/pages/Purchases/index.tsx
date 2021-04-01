import React, { useCallback, useEffect, useState } from 'react';

import { FiDelete, FiMoreVertical, FiPenTool } from 'react-icons/fi';

import PurchaseIcon from '../../assets/images/grocery.svg';
import Tooltip from '../../components/Tooltip';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import {
  Container,
  AnimationContainer,
  ListPurchases,
  GroupOptions,
  InformationPurchase,
} from './styles';

interface IPurchase {
  id: string;
  total: number;
}

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadPurchases() {
      try {
        const { data } = await api.get('/purchases/all');

        setPurchases([...data]);
        addToast({ title: 'Carregado todas as compras' });
      } catch {
        addToast({
          title: 'Occoreu algum erro',
          description: 'Falha na comunicação com o servidor',
          type: 'error',
        });
      }
    }

    loadPurchases();
  }, [addToast]);

  const handleAlter = useCallback(async (id: string) => {}, []);
  const handleDelete = useCallback(async (id: string) => {}, []);
  const handleMoreInformation = useCallback((id: string) => {}, []);

  return (
    <Container>
      <AnimationContainer>
        <h1>Compras</h1>
      </AnimationContainer>

      <ListPurchases>
        {purchases.map((purchase) => (
          <div key={purchase.id}>
            <img src={PurchaseIcon} alt="Purchase" />
            <InformationPurchase>
              <strong>{purchase.id}</strong>
              <p>Total: {purchase.total}</p>
            </InformationPurchase>
            <GroupOptions>
              <button type="button" onClick={() => handleAlter(purchase.id)}>
                <Tooltip title="Editar">
                  <FiPenTool size={20} />
                </Tooltip>
              </button>
              <button type="button" onClick={() => handleDelete(purchase.id)}>
                <Tooltip title="Deletar">
                  <FiDelete size={20} color="#c53030" />
                </Tooltip>
              </button>
              <button
                type="button"
                onClick={() => handleMoreInformation(purchase.id)}
              >
                <Tooltip title="Mais informações">
                  <FiMoreVertical size={20} />
                </Tooltip>
              </button>
            </GroupOptions>
          </div>
        ))}
      </ListPurchases>
    </Container>
  );
};

export default Purchases;
