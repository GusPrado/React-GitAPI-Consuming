import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, SubmitButton, Form } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
    };

    handleInputChange = event => {
        this.setState({ newRepo: event.target.value });
    };

    render() {
        const { newRepo } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form onSubmit={() => {}}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton disable>
                        <FaPlus color="#FFF" size={14} />
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}
