import React from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import Dashboard from "../pages/secure/Dashboard";
import RoutePrivate from './route-wrapper';
import ContactsAddPage from './../pages/secure/ContactAdd';
import ContactListPage from './../pages/secure/ContactList';
import ContactDetailPage from './../pages/secure/ContactDetail';

export default function Routes(){
    return (

        <Router>
            <Switch>
                <RoutePrivate exact path='/' component={Dashboard} />
                <RoutePrivate exact path='/contacts' component={ContactListPage} />
                <RoutePrivate exact path='/contacts/add' component={ContactsAddPage} />
                <RoutePrivate exact path='/contacts/:contactId' component={ContactDetailPage} />
                <Route exact path='/signIn' component={SignIn} />
                <Route exact path='/signUp' component={SignUp} />
            </Switch>
        </Router>

    )
}