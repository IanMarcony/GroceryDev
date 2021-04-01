import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Purchases from '../pages/Purchases';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/purchases" component={Purchases} />
    </Switch>
  );
};

export default Routes;
