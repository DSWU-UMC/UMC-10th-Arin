export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieResponse = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
};

{/* 위의 코드에 대한 설명
const {data} = await axios(
    'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
    {
        headers: {
             Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    }
);

axios의 기본값은 get으로 이번 미션에서는 get으로 사용하고 있으나, 상황에 따라 post를 원할 수 있음
=> 위의 코드에 대한 타입을 아는 것[정의하는 것]이 중요함

data에는 results에 있는 영화 정보뿐만 아니라 page, total_pages, total_results에 대한 정보도 있음

*/}