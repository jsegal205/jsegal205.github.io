import React from "react";

import "./search-filter.css";

const SearchFilter = ({
  handleResetClick,
  handleSearchChange,
  searchValue,
}) => (
  <section className="search-filter-container">
    <label htmlFor="search-filter">Search</label>
    <input
      type="text"
      id="search-filter"
      className="search-filter-input"
      value={searchValue}
      onChange={handleSearchChange}
      data-testid="search-filter"
    />
    {searchValue && (
      <button
        className="search-filter-reset"
        onClick={handleResetClick}
        data-testid="search-filter-reset"
      >
        Reset
      </button>
    )}
  </section>
);

export default SearchFilter;
