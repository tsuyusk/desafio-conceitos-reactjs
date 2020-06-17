import React, { useState } from "react";

import "./styles.css";

function Form({ handleAddRepository }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "https://github.com/",
    techs: "",
  });
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { title, url, techs } = formData;
    const techsList = techs.split(",");
    handleAddRepository(title, url, techsList);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <h4>Titulo do repositório</h4>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="React JS Introduction"
          required
        />
      </div>
      <div className="field">
        <h4>URL do repositório</h4>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          placeholder="https://github.com/..."
          required
        />
      </div>
      <div className="field">
        <h4>Tecnologias que foram usadas</h4>
        <input
          type="text"
          name="techs"
          value={formData.techs}
          onChange={handleInputChange}
          placeholder="React js, Node JS, React Native"
          required
        />
      </div>
      <br />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default Form;
