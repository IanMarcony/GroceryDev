import React, { createContext, useContext, useCallback, useState } from 'react';

interface FormTypeContextData {
  getFormType(): FormTypeState;
  setFormType(typef: 'edit' | 'create', idf: string): void;
}

interface FormTypeState {
  type: 'edit' | 'create';
  id?: string;
}

const FormTypeContext = createContext<FormTypeContextData>(
  {} as FormTypeContextData,
);

const FormTypeProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<'edit' | 'create'>('edit');
  const [id, setId] = useState('');

  const getFormType = useCallback((): FormTypeState => {
    return { type, id };
  }, [type, id]);

  const setFormType = useCallback(
    (typef: 'edit' | 'create', idf = ''): void => {
      setType(typef);
      setId(idf);
    },
    [],
  );

  return (
    <FormTypeContext.Provider value={{ getFormType, setFormType }}>
      {children}
    </FormTypeContext.Provider>
  );
};

function useFormType(): FormTypeContextData {
  const context = useContext(FormTypeContext);

  if (!context) {
    throw new Error('useFormType must be used within a FormTypeProvider');
  }

  return context;
}

export { FormTypeProvider, useFormType };
