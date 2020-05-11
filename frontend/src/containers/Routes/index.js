import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Loading from "components/Loading";

const ComponentLoading = () => (
  <div>
    <Loading full colored height="160px" width="160px" />
  </div>
);

const Game = React.lazy(() => import("containers/Game"));
const Error404 = React.lazy(() => import("containers/Errors/error404"));

const Routes = () => (
  <Router>
    <React.Suspense fallback={<ComponentLoading />}>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/404" component={Error404} />
        <Route component={Error404} />
      </Switch>
    </React.Suspense>
  </Router>
);

export default Routes;
