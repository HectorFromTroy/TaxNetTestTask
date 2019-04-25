import React, {Component} from "react";
import "../sass/tag.sass";

export default props => {
  return (
    <div className={`tag ${props.isSelected ? "tag_selected" : ""}`}
    onClick={props.toggleTag}
    data-tagname={props.title}>
      {props.title}
    </div>
  );
};