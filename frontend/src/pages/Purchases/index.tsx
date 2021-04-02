import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import { FiDelete, FiMoreVertical, FiPenTool, FiPlus } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    async function loadPurchases() {
      try {
        const { data } = await api.get('/purchases/all');

        setPurchases([...data]);
      } catch {
        addToast({
          title: 'Occoreu algum erro',
          description: 'Falha na comunicação com o servidor',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }

    loadPurchases();
  }, [addToast]);

  const handleAlter = useCallback(
    (id: string) => {
      history.push(`/form_purchases?type=edit&id=${id}`);
    },
    [history],
  );
  const handleDelete = useCallback(
    async (id: string, index: number) => {
      addToast({
        title: 'Deletando....',
      });
      await api.delete('/purchases', {
        data: {
          id,
        },
      });
      addToast({
        type: 'success',
        title: 'Deletado com sucesso',
      });

      setPurchases((state) => state.splice(index, 1));
    },
    [addToast],
  );
  const handleMoreInformation = useCallback(
    (id: string) => {
      history.push(`/info_puchase/${id}`);
    },
    [history],
  );

  const handleCreate = useCallback(() => {
    history.push('/form_purchases?type=create');
  }, [history]);

  if (loading) {
    return (
      <Container>
        <AnimationContainer>
          <h1>Compras</h1>
          <CircularProgress size={40} color="primary" />
        </AnimationContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AnimationContainer>
        <h1>Compras</h1>
      </AnimationContainer>
      <button
        type="button"
        onClick={() => handleCreate()}
        style={{
          background: 'transparent',
          outline: 'none',
          border: 'none',
        }}
      >
        <FiPlus size={30} color="#385a64" />
      </button>
      {purchases.length > 0 ? (
        <>
          <ListPurchases>
            {purchases.map((purchase, index) => (
              <div key={purchase.id}>
                <img src={PurchaseIcon} alt="Purchase" />
                <InformationPurchase>
                  <strong>{purchase.id}</strong>
                  <p>Total: {purchase.total}</p>
                </InformationPurchase>
                <GroupOptions>
                  <button
                    type="button"
                    onClick={() => handleAlter(purchase.id)}
                  >
                    <Tooltip title="Editar">
                      <FiPenTool size={20} />
                    </Tooltip>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(purchase.id, index)}
                  >
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
        </>
      ) : (
        <AnimationContainer>
          <h1 style={{ fontSize: '20px' }}>Sem compras!</h1>
        </AnimationContainer>
      )}
    </Container>
  );
};

export default Purchases;
