import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ( { Component, ...restProps } ) => {
    // const user = useSelector((state) => state.auth.currentUser);
    const { currentUser } = useSelector((state) => state.auth);

    return currentUser !== null ? (  <Component { ...restProps }  key={restProps.match.params.id || 'empty'}/> ) : ( <Redirect to="/login"/>)
}

export default PrivateRoute