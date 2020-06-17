import React from "react";

export default function List({
  repositories,
  handleLikeRepository,
  handleRemoveRepository,
}) {
  return (
    <ul data-testid="repository-list">
      {repositories.map((repository) => (
        <li key={repository.id}>
          <h4>
            <a href={repository.url}>{repository.title}</a>
          </h4>
          <h4>{repository.likes} likes</h4>
          <div className="bubble-container">
            {repository.techs.map((tech) => (
              <div key={tech} className="bubble">
                {tech}
              </div>
            ))}
          </div>
          <div className="buttons-list">
            <button
              className="-green"
              onClick={() => handleLikeRepository(repository.id)}
            >
              Like
            </button>
            <br />
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
