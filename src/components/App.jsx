import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import axios from 'axios';
import Films from "./Films.jsx";
import Bookmarks from "./Bookmarks.jsx";
import "../sass/app.sass";
import shortId from "short-id";

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      location: null,
      allFilms: [],
      filmsToRender: [],
      allTags: [],
      selectedTags: new Set(),
      countOfFilmsToShow: 15
    };
    //for setting searcher input to empty string after changing tags
    this.searcherElement;
    //this is for storing films based on tags
    //for searching, films will be searched in this array
    this.filmsToRenderBasedOnTags;

    this.setActiveRoute = this.setActiveRoute.bind(this);

    this.setFilmsToRender = this.setFilmsToRender.bind(this);

    this.searchFilms = this.searchFilms.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.areFilmsTagsInSelectedTags = this.areFilmsTagsInSelectedTags.bind(this);
    this.showMore = this.showMore.bind(this);
    this.getFavoriteFilms = this.getFavoriteFilms.bind(this);
    this.updateFilmsToRender = this.updateFilmsToRender.bind(this);
    this.setRef = this.setRef.bind(this);
  };

  setActiveRoute(path){
    this.setState({
      location: path
    });
  };

  setFilmsToRender(){
    
    if(this.state.selectedTags.size === 0){
      this.filmsToRenderBasedOnTags = this.state.allFilms;
      return this.state.allFilms;
    }
    else{
      const result = this.state.allFilms.filter(film => this.areFilmsTagsInSelectedTags(film.tags));
      this.filmsToRenderBasedOnTags = result;
      return result;
    }

  };

  searchFilms(event){
    const searchText = event.target.value;
    this.setState(() => {
      const result = this.filmsToRenderBasedOnTags.filter(film => 
        film.title.indexOf(searchText) === 0
      )
      return{
        filmsToRender: result
      };
    });

  };

  async componentDidMount(){
    const responseFilms = (await axios.get("./jsons/films.json")).data.sort((a, b)=>{
      if (a.title < b.title)
        return -1;
      if ( a.title > b.title)
        return 1;
      return 0;
    });
    const responseTags = (await axios.get("./jsons/tags.json")).data;
    
    //setting keys
    responseFilms.forEach(film =>{
      film.key = shortId.generate();
      film.isFavorite = !!localStorage.getItem(film.title);
    });

    responseTags.forEach((tag, index) =>{
      responseTags[index] = {
        title: tag,
        key: shortId.generate()
      };
    });

    this.filmsToRenderBasedOnTags = responseFilms;
    this.setState({
      allFilms: responseFilms,
      filmsToRender: responseFilms,
      allTags: responseTags
    });
    
  };

  toggleTag(event){
    
    //hardcode :)))) setting searcher input to empty string
    this.searcherElement.value = "";
    const tagName = event.target.dataset.tagname;
    this.setState((prevState)=>{
      const selectedTags = prevState.selectedTags;
      !selectedTags.delete(tagName) && selectedTags.add(tagName);
      return {
        selectedTags: selectedTags,
        filmsToRender: this.setFilmsToRender()
      }
    });

  };

  toggleFavorite(event){

    const filmName = event.target.dataset.filmname;
    let result;

    if(localStorage.getItem(filmName)){
      localStorage.removeItem(filmName);
      result = false;
    }
    else{
      localStorage.setItem(filmName, true);
      result = true;
    }

    this.setState((prevState)=>{

      //i have to go through all array (in worst case) to find film i clicked
      //that's why a would use hash table(set in js) instead of array of films
      //i use some because I know that i need only one film (i clicked at only one film)
      //when i find this film i should leave from array iteration
      prevState.allFilms.some((film, index) =>{
        if(film.title === filmName){
          prevState.allFilms[index].isFavorite = result;
          return true;
        }
      });

      return {
        allFilms: prevState.allFilms
      }

    });

  };

  areFilmsTagsInSelectedTags(filmsTags){
    const countOfSelectedTags = this.state.selectedTags.size;
    let countOfMatched = 0;
    for(let i = 0; i < filmsTags.length; i++){
      if(this.state.selectedTags.has(filmsTags[i]))
        countOfMatched++;
    }
    return countOfMatched < countOfSelectedTags ? false : true;
  };

  showMore(){

    this.setState(prevState => {
      return {countOfFilmsToShow: prevState.countOfFilmsToShow + 15}
    });

  };

  getFavoriteFilms(){
    const films = this.state.allFilms;
    if(films.length === 0) return [];
    const result = films.filter(film => film.isFavorite);
    this.state.filmsToRender = result;
    return result;
  };

  updateFilmsToRender(){
    this.setState({
      filmsToRender: this.state.allFilms
    });
  };

  setRef(node){
    this.searcherElement = node;
  };

  render(){
    return(
      <div className="app">
        <nav className="app__nav">
          <ul className="nav__list">
            <li className={`nav-list__item
                          ${this.state.location === "/" && "nav-list__item_active"}`}>
              <Link to="/">Films</Link>
            </li>
            <li className={`nav-list__item
                          ${this.state.location === "/bookmarks" && "nav-list__item_active"}`}>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/"
          render={(props) => <Films 
            {...props} 
            setActive={this.setActiveRoute}
            searchFilms={this.searchFilms}
            allFilms={this.state.filmsToRender}
            allTags={this.state.allTags}
            selectedTags={this.state.selectedTags}
            countOfFilmsToShow={this.state.countOfFilmsToShow}
            //methods
            toggleFavorite={this.toggleFavorite}
            toggleTag={this.toggleTag}
            updateFilmsToRender={this.updateFilmsToRender}
            setRef={this.setRef}
          />}
        />
        <Route path="/bookmarks"
          render={(props) => <Bookmarks 
            {...props} 
            setActive={this.setActiveRoute}
            allFilms={this.getFavoriteFilms()}
            updateFilmsToRender={this.updateFilmsToRender}
            countOfFilmsToShow={this.state.countOfFilmsToShow}
            toggleFavorite={this.toggleFavorite}
          />}
        />

        {
          this.state.filmsToRender.length > this.state.countOfFilmsToShow &&
            <div className="showMore"
              onClick={this.showMore}
            >
              Показать ещё...
            </div> 
        }
        
      </div>
    );
  };
};