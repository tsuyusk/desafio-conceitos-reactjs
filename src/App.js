import React, { useState, useEffect } from "react";

import api from "./services/api";

import Form from "./components/Form";
import List from "./components/List";
import { Spinner } from "reactstrap";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleAddRepository(title, url, techs) {
    try {
      setError(false);
      setLoading(true);
      const repositoryToBeSent = {
        title,
        url: `https://github.com/${url}`,
        techs,
      };
      const response = await api.post("/repositories", repositoryToBeSent);
      setRepositories([...repositories, response.data]);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
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
      <Form handleAddRepository={handleAddRepository} />
      <div className="center -far">
        {loading && <Spinner />}
        {error && <p className="text-danger">Error..</p>}
      </div>
      <List
        repositories={repositories}
        handleLikeRepository={handleLikeRepository}
        handleRemoveRepository={handleRemoveRepository}
      />
    </div>
  );
}

export default App;
