import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ( { Component, ...restProps } ) => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // if (!Component) return null;

    return (
        <Route
          {...restProps}
          render={routeRenderProps => <Component {...restProps} />}
        />
      )
}

export default PublicRoute

