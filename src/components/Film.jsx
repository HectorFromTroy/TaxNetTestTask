import React, {Component} from "react";
import "../sass/film.sass";

export default class Film extends Component{

  render(){
    return (
      <div className="film">
        <div className="film__name">
          {this.props.title}
        </div>
        <div className={`film__favorite ${this.props.isFavorite ? "film__favorite_selected" : ""}`}
          onClick={this.props.onFavoriteClick}
          data-filmname={this.props.title}
        >
        
        </div>
      </div>
    )
  }

};