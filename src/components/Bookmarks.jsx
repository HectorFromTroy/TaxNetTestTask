import React, {Component} from "react";
import Film from "./Film.jsx";

export default class Bookmarks extends Component{

  componentDidMount(){
    //setting active page
    this.props.setActive(this.props.match.path);
  };

  render(){
    return (
      <section className="bookmarks">
        <div className="film-container">
          {
            this.props.allFilms.slice(0, this.props.countOfFilmsToShow)
              .map(film => 
                <Film 
                  title={film.title}
                  isFavorite={film.isFavorite}
                  onFavoriteClick={this.props.toggleFavorite}
                  key={film.key}
                />
              )
          }
        </div>
      </section>
    );
  };
};