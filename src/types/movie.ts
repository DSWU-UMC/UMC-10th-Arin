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

// 영화 상세 페이지용 타입
export interface MovieDetail {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
    runtime: number,
    tagline: string;
    genres: {
        id: number,
        name: string,
    }[];
}

// 출연진 1명 타입
export interface Cast {
    id: number;
    name: string;
    character: string;
    // 사진 경로 null일 수도 있음 (사진 없는 배우)
    profile_path: string | null; 
}

// 크레딧 전체 타입
export interface Credits {
    cast: Cast[];
}

/* 위의 코드에 대한 설명
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

*/