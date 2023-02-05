import React from "react";
import Header from "../../../shared/header";
import { PageContent } from "../../../shared/styles";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component{
    render(){

        return (

            <>
            <Header />
            <PageContent>
                <Container>
                    <h2>Dashboard</h2>

                    <p>Aqui será listado envios de contatos, e outros.</p>
                </Container>
            </PageContent>        
        </>

        )        
    }
}

export default withRouter(Dashboard);