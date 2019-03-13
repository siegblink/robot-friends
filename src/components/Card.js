import React from 'react';

const Card = ({ name, email, id }) => {
  return (
    <div className="card">
      <img className="robots" alt="robots" src={`https://robohash.org/${id}?200x200`} />
      <div className="robot-desc">
        <h2 className="robot-name">{name}</h2>
        <p className="robot-email">{email}</p>
      </div>
    </div>
  );
};

export default Card;
