import React, { useState, useEffect } from "react";

import api from "./services/api";

import Form from "./components/Form";
import List from "./components/List";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository(title, url, techs) {
    const repositoryToBeSent = {
      title,
      url,
      techs,
    };
    const response = await api.post("/repositories", repositoryToBeSent);
    setRepositories([...repositories, response.data]);
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);
    const newRepositories = [...repositories];
    const selectedRepositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    newRepositories[selectedRepositoryIndex].likes = response.data.likes;
    setRepositories(newRepositories);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  return (
    <div>
      <Form handleAddRepository={handleAddRepository} />
      <List
        repositories={repositories}
        handleLikeRepository={handleLikeRepository}
        handleRemoveRepository={handleRemoveRepository}
      />
    </div>
  );
}

export default App;
