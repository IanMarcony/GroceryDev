import React from 'react';
import { FormTypeProvider } from './formType';

import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <FormTypeProvider>{children}</FormTypeProvider>
    </ToastProvider>
  );
};

export default AppProvider;
