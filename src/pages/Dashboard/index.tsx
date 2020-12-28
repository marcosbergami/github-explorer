import React, { useState, useEffect, FormEvent, useContext } from 'react';
import Switch from 'react-switch';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, Title, Form, Repositories, Error } from './styles';

interface Props {
  toggleTheme(): void;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC<Props> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Type in author/repository name to search');
      return;
    }

    const currentRepositories = JSON.stringify(repositories);

    if (currentRepositories.includes(newRepo)) {
      for (let i = 0; i < repositories.length; i += 1) {
        if (repositories[i].full_name === newRepo) {
          const sortedArray = repositories.splice(i, 1);
          repositories.unshift(sortedArray[0]);
          break;
        }
      }
      setNewRepo('');
      setInputError('');
      return;
    }

    try {
      const response = await api.get(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Repository not found.');
    }
  }
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor="#737370"
          onColor="#04d361"
        />
      </Header>

      <Title>Explore Github repositories.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Search repositories..."
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
