import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { SubmitButton, Form, List } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: null,
    };

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories),
            });
        }
    }

    // Salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = event => {
        this.setState({
            newRepo: event.target.value,
            error: null,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            error: false,
        });
        try {
            const { newRepo, repositories } = this.state;
            if (newRepo === '')
                throw new Error('Você precisa inserir um repositório');
            const hasRepo = repositories.find(rep => rep.name === newRepo);
            if (hasRepo) throw new Error('Repositório duplicado');
            const res = await api.get(`/repos/${newRepo}`);
            const data = {
                name: res.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
            });
        } catch (error) {
            this.setState({
                error: true,
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { newRepo, repositories, loading, error } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios{' '}
                </h1>{' '}
                <Form onSubmit={this.handleSubmit} error={error}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />{' '}
                    <SubmitButton loading={loading}>
                        {' '}
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}{' '}
                    </SubmitButton>{' '}
                </Form>{' '}
                <List>
                    {' '}
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span> {repository.name} </span>{' '}
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes{' '}
                            </Link>{' '}
                        </li>
                    ))}{' '}
                </List>{' '}
            </Container>
        );
    }
}
