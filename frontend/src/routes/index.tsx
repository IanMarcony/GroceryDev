import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import FormProducts from '../pages/Products/FormProducts';
import ProductsMoreInformation from '../pages/Products/ProductsMoreInformation';
import Purchases from '../pages/Purchases';
import FormPurchases from '../pages/Purchases/FormPurchases';
import PurchasesMoreInformation from '../pages/Purchases/PurchasesMoreInformation';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/purchases" component={Purchases} />
      <Route path="/info_product/:id+" component={ProductsMoreInformation} />
      <Route path="/info_puchase/:id+" component={PurchasesMoreInformation} />
      <Route path="/form_products" component={FormProducts} />
      <Route path="/form_purchases" component={FormPurchases} />
    </Switch>
  );
};

export default Routes;
