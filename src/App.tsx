// v5 버전: BrowserRouter
// v6 버전: createBrowserRouter <- 이 버전으로 진행
// v7 버전: react-router-dom (next.js, remix)

import './App.css';
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    // HomePage 안에 children 있음
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      // 영상에는 없는 아래 코드 추가
      {
        index: true,
        element: <MoviePage/>,
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      // 영화 포스터 눌렀을 때 상세 페이지로 이동
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      }
    ],
  },
]);

/* 페이지 5개 제작 
movies/upcoming
movies/popular
movies/now_playing
movies/top_rated
movies/category/{movie_id}
*/

function App() {
  return <RouterProvider router={router} />;
}
export default App;