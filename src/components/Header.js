import React from 'react';

const Header = props => {
  return (
    <div className="navbar" id="navbar">
      <div className="header-title">Robofriends</div>
      {props.children}
    </div>
  );
};

export default Header;
