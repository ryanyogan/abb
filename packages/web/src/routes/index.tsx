import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { RegisterConnector as Register } from "../modules/register/RegisterConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
