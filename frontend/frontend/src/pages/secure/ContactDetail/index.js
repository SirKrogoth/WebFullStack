import React from "react";
import Header from '../../../shared/header';
import { PageContent } from '../../../shared/styles';
import { Container } from "react-bootstrap";
import ContactsService from '../../../services/contacts';
import { withRouter, Link } from 'react-router-dom';

function RenderContact({ contact }) {
    return (
        <>
            <p>Nome: { contact.name }</p>
            <p>E-Mail: { contact.email }</p>
            <p>Telefone: {contact.phone}</p>
        </>
    )
}

class ContactsDetails extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            contact: null
        }
    }

    async getContact(contactId){
        const service = new ContactsService();

        const result = await service.getOne(contactId);

        this.setState({
            isLoading: false,
            contact: result,
        })
    }

    async componentDidMount(){
        const { params: { contactId }} = this.props.match;

        await this.getContact(contactId);
    }

    render(){
        const { isLoading, contact } = this.state;

        return (
            <>
                <Header />
                <PageContent>
                    <Container>
                        <p>Dados do contato</p>

                        { isLoading ? (
                            <p>Carregando...</p>
                        ) : (<RenderContact contact={contact} />) }
                        
                        <Link className="btn btn-link" to="/contacts">Voltar</Link>
                    </Container>                    
                </PageContent>
            </>
        )
    }
}

export default ContactsDetails;