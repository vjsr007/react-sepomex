import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../components/layout/Dashboard";

export const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("auth") ? (
        <Dashboard props={props} component={component} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
