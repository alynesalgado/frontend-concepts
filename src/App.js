import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = api.post('repositories', {
      title: `ReactJS challenge ${Date.now()}`,
      url: "https://github.com/alynesalgado/frontend-concepts",
      techs: ["React", "React Native"]
    });

    const repository = (await response).data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    const repositoryToDeleteIndex = await repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryToDeleteIndex, 1);

    const newRepositories = [...repositories]

    setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
