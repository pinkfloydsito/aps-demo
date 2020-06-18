import React, { useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Storage from './utils/Storage'

import * as authDuck from "./redux/ducks/auth.duck";
import APSDropZone from './components/APSDropZone'
import Nav from './components/Nav'
import Login from './components/Login'

const Routes = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  useEffect(() => {
    let token = null;
    try {
      token = Storage.get('token')
      if(token) {
        dispatch(authDuck.actions.login({ token }))
      }
    } catch (err) {
      // TODO: Remove this console.error.
      console.error(err);
    } finally {}
  }, [])

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <React.Fragment>
      <Route path="/" render={() => (<Nav />)} />
      <Switch>
        {!isAuthorized ? (
          <Login />
        ) : (
          <Redirect from="/login" to={'/'} />
        )}

          <Route exact path="/login" render={() => (<Login />)} />
          <Route exact path="/" render={() => (<APSDropZone />)} />
          <Route exact path="/signup" render={() => (<Login />)} />

        {!isAuthorized ? (
          <Redirect  from={'/'} to={'/login'} />
        ) : <APSDropZone />}


      </Switch>
    </React.Fragment>
  );
});

export default Routes;
