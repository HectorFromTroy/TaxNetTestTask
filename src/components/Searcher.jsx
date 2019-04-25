import React from "react";
import "../sass/searcher.sass";

export default props => {

  return (
    <div className="searcher-container">
      <input 
        type="text"
        className="searcher__search-input"
        onChange={props.searchFilms}
      />
    </div>
  );

};