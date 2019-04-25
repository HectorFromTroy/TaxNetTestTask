import React from "react";
import "../sass/searcher.sass";

export default props => {

  // function setRef(node){
  //   props.setRef(node);
  // };

  return (
    <div className="searcher-container">
      <input 
        type="text"
        className="searcher__search-input"
        onChange={props.searchFilms}
        ref={props.setRef}
      />
    </div>
  );

};