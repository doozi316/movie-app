import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

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


  render() {
    const { isLoading, movies } = this.state;
    return ( //react가 클래스와 속성을 혼란스러워하므로 JSX의 class는 className이라고 해주기
      <section className="container"> 
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}


export default App;
