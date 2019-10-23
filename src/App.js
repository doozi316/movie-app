import React from 'react';
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component{

  
  state = {
    isLoading : true,
    movies : []
    };
  

    // YTS API 가져오는 메소드 getMovies
    getMovies = async() =>{ //비동기
      const {
        data: {
          data:
          { movies } // movies.data.data.movies
        }
      } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); //axios가 완료될 때까지 기다린다.
      this.setState({ movies, isLoading : false });
    }
  

    componentDidMount(){
    this.getMovies(); // 컴포넌트가 생성된 뒤, getMovies 실행
  }


  render(){
    
      const {isLoading, movies} = this.state;
      return <div>{isLoading ? "Loading..." : movies.map(movie => {
        console.log(movie);
        return ( 
        <Movie //Movie.js 의 props 가져오기
        id={movie.id} 
        year={movie.year} 
        title={movie.title} 
        summary={movie.summary} 
        poster={movie.mideum_cover_image}/>
      )})}</div>
  }
}

export default App;
