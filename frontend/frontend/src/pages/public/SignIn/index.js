import React from 'react';
import {Button, Form, Container, Row, Col, Alert} from 'react-bootstrap';
import Logo from '../../../assets/mailchimp.jpg';
import {BoxContent, BoxForm} from '../../../shared/styles/index';
import {Link, withRouter} from 'react-router-dom';
import { login } from '../../../services/auth';
import AccountsService from '../../../services/accounts';

class SignIn extends React.Component{

    state = {
        email: '',
        password: '',
        error: ''
    }

    handleSignIn = async (event) => {
        event.preventDefault();

        const { email, password, error } = this.state;

        if(!email || !password){
            this.setState({ error: "Informe email e password para entrar no sistema."});
        }
        else{
            try {
                const service = new AccountsService();

                const response = await service.login(email, password);
            
                login(response.data.token);
                this.props.history.push("/");
                
            } catch (err) {
                console.log(err);
                this.setState({error: "Ocorreu um erro durante o acesso ao sistema. Contate o administrador."});
            }
        }
    }

    renderError = () => {
        return (
            <Alert variant="danger">
                {this.state.error}
            </Alert>
        )
    }

    render(){
        return (
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={5}>
                        <BoxContent>
                            <img src={Logo} alt="MailShrimp" width="150" height="150"/>
                        </BoxContent>
                        <BoxForm>
                            <h2>Login</h2>
                            <p>Informe seus dados para autenticar: </p>   

                            <Form onSubmit={this.handleSignIn}>
                                {this.state.error && this.renderError()}
                                <Form.Group controlId='emailGroup'>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control type="email" placeholder='Digite seu e-mail' onChange={e => this.setState({ email: e.target.value })}/>
                                </Form.Group>

                                <Form.Group controlId='passwordGroup'>
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control type="password" placeholder='Digite sua senha' onChange={e => this.setState({ password: e.target.value })}/>
                                </Form.Group>                                  
                                <div className='d-grid gap-2'>
                                    <br />
                                    <Button variant='secondary' type='submit'>
                                        Fazer login
                                    </Button>
                                </div>                           
                            </Form>          
                        </BoxForm>
                        <BoxContent>
                            <p>Nova plataforma?</p>
                            <Link className='button' to="/signup">Crie sua conta agora</Link>
                        </BoxContent>
                    </Col>
                </Row>
                
            </Container>
                
            
        )
    }

}

export default withRouter(SignIn);