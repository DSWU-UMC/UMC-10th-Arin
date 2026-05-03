// 어떤 코드인지
// useEffect = 데이터 가져오기 / setMovies = 상태 저장 / map = 화면 출력
/* 전체 흐름: 페이지 열림 -> 데이터 가져옴 -> 저장 -> 화면에 자동 반영
1. 페이지 처음 열림 -> 컴포넌트 실행됨
2. 처음 1번 useEffect 실행됨 -> fetchMoives 함수 실행
3. fetchMovies 내부 -> axios: 서버(API) 에 요청 보냄
4. await로 기다림 -> 서버에서 영화 데이터 도착
5. setMovies 실행 -> 받아온 영화 리스트를 상태에 저장
6. 상태 변경 발생 -> React가 자동으로 화면 다시 그림 [리렌더링]
7. movies.map 실행 -> 영화 목록이 화면에 출력됨
*/
// TMDB API에서 영화 데이터를 가져와 상태에 저장하고, 그걸 화면에 리스트로 출력

// useEffect = 데이터 가져오기 / setMovies = 상태 저장 / map = 화면 출력
/* 전체 흐름: 페이지 열림 -> 데이터 가져옴 -> 저장 -> 화면에 자동 반영
1. 페이지 처음 열림 -> 컴포넌트 실행됨
2. 처음 1번 useEffect 실행됨 -> fetchMoives 함수 실행
3. fetchMovies 내부 -> axios: 서버(API) 에 요청 보냄
4. await로 기다림 -> 서버에서 영화 데이터 도착
5. setMovies 실행 -> 받아온 영화 리스트를 상태에 저장
6. 상태 변경 발생 -> React가 자동으로 화면 다시 그림 [리렌더링]
7. movies.map 실행 -> 영화 목록이 화면에 출력됨
*/

import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);
  console.log(import.meta.env.VITE_TMDB_TOKEN);

  useEffect(() => {
    const fetchMovies = async () => {
      // TMDB 서버에 요청 보내서 인기 영화 데이터 가져와
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;