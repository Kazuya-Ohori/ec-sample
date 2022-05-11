import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  ProductList,
  SignIn,
  SignUp,
  Reset,
  ProductEdit,
  ProductDetail,
} from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route path={'/signup'} exact component={SignUp} />
      <Route path={'/signin'} exact component={SignIn} />
      <Route path={'/signin/reset'} exact component={Reset} />

      <Auth>
        <Route path={'(/)?'} exact component={ProductList} />
        <Route path={'/product/:productId'} exact component={ProductDetail} />
        <Route path={'/product/edit/:productId'} component={ProductEdit} />
        <Route path={'/product/edit'} exact component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
