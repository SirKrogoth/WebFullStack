import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const RouteWrapper = ({ component: Component, ...rest }) => (

    <Route 
        {...rest}
        render={props => 
        isAuthenticated() ? 
        (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: "/signIn", state: { from: props.location }}} />
        )
    }
    />
)

export default RouteWrapper;