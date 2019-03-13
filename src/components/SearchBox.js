import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className="input-container">
      <input
        className="input-box"
        type="search"
        placeholder="Search Robots"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
