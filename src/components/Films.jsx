import React, {Component} from "react";
import Searcher from "./Searcher.jsx";
import Film from "./Film.jsx";
import Tag from "./Tag.jsx";
import "../sass/films.sass";


export default class Films extends Component{

  componentDidMount(){
    //setting active page
    this.props.setActive(this.props.match.path);
    this.props.updateFilmsToRender();
  };


  render(){
    return(
      <section className="films">
        <Searcher
          searchFilms={this.props.searchFilms}
        />

        <div className="tags-container">
          {this.props.allTags.map(tag => 
            <Tag 
              title={tag.title}
              isSelected={this.props.selectedTags.has(tag.title)}
              key={tag.key}
              toggleTag={this.props.toggleTag}
            />
          )}
        </div>

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