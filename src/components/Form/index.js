import React, { useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

import "./styles.css";

function Form({ handleAddRepository }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
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
      <h4 className="title">Titulo do repositório</h4>
      <InputGroup>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="React JS Introduction"
          autoComplete="off"
          required
        />
      </InputGroup>
      <h4 className="title">URL do repositório</h4>
      <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          github.com/
        </InputGroupText>
      </InputGroupAddon>
        <Input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          placeholder="tsuyusk/..."
          autoComplete="off"
          required
        />
        </InputGroup>
        <h4 className="title">Tecnologias que foram usadas</h4>
        <InputGroup>
          <Input
            type="text"
            name="techs"
            value={formData.techs}
            onChange={handleInputChange}
            placeholder="React js, Node JS, React Native"
            autoComplete="off"
            required
          />
      </InputGroup>
      <br />
      <div className="button-container">
        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}

export default Form;
