import React, { useState, useEffect } from "react";

import api from "./services/api";

import Form from "./components/Form";
import List from "./components/List";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [ error, setError ] = useState(false);
  async function handleAddRepository(title, url, techs) {
    try {
      setError(false);
      const repositoryToBeSent = {
        title,
        url,
        techs,
      };
      const response = await api.post("/repositories", repositoryToBeSent);
      setRepositories([...repositories, response.data]);
    } catch {
      setError(true);
    }
  }

  async function handleLikeRepository(id) {
    try {
      setError(false);
      const response = await api.post(`/repositories/${id}/like`);
      const newRepositories = [...repositories];
      const selectedRepositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      newRepositories[selectedRepositoryIndex].likes = response.data.likes;
      setRepositories(newRepositories);
    } catch {
      setError(true);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      setError(false);
      api.delete(`/repositories/${id}`);
      const newRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(newRepositories);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  return (
    <div>
      <h2>Repository</h2>
      <Form handleAddRepository={handleAddRepository} />
      {error && <p>Error..</p>}
      <List
        repositories={repositories}
        handleLikeRepository={handleLikeRepository}
        handleRemoveRepository={handleRemoveRepository}
      />
    </div>
  );
}

export default App;
