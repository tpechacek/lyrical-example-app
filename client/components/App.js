import React from 'react';

// We are destructuring. These are passed into this functions as props.
// So children is coming off the props object.
export default ({ children }) => {
  return <div className="container">{children}</div>;
};
