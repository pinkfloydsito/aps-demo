import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import APSDropZone from './components/APSDropZone'
import Nav from './components/Nav'

const Routes = withRouter(({ history }) => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <React.Fragment>
      <Route path="/" render={() => (<Nav />)} />
      <Switch>
          <Route exact path="/login" render={() => (<div>Match</div>)} />
          <Route exact path="/dashboard" render={() => (<APSDropZone />)} />
          <Route exact path="/signup" render={() => (<APSDropZone />)} />

        {!isAuthorized ? (
          <Redirect to={'/login'} />
        ) : (
          <Redirect to={'/dashboard'} />
        )}
      </Switch>
    </React.Fragment>
  );
});

export default Routes;
