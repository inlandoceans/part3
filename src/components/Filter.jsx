import React from "react";

const Filter = ({ newSearch, handleSearch }) => (
  <React.Fragment>
    <span>filter shown with </span>
    <input value={newSearch} onChange={handleSearch} />
  </React.Fragment>
);

export default Filter;
