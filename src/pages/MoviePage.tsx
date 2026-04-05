import { useEffect, useState } from "react";
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';


export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);

    // 2. 에러 상태
    const [isError, setIsError] = useState(false);

    // 3. 페이지
    const [page, setPage] = useState(1);

    // 영상에는 없는 아래 코드로 수정
    /* 영상 코드
    const { category } = useParams<{
        category: string;
    위와 같이 작성 안 한 이유: /movies/popluar은 category가 있지만 /은 카테고리 없음
    */
    // PMDB에서 동적으로 다양한 정보? 페이지? 받기 (+ useParams의 타입 지정하기 / {category} = 구조 분해 할당)
    // category 없으면 popular을 기본값으로 사용 + category 있을 수도, 없을 수도
    const { category = 'popular' } = useParams<{
        category?: string;
    }>();

    // 카테고리 바뀌면 1번째 페이지로 초기화
    useEffect (() => {
        setPage(1);
    }, [category]);
    
    useEffect(() => {
        const fetchMovies = async (): Promise<void> => {
            // fetchMovies를 시작할 때는 로딩 상태가 데이터를 호출하는 중이므로
            setIsPending(true);
            // 영상에는 없는 아래 코드 추가
            setIsError(false);

            // 성공했을 때
            try {
                const {data} = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );

                setMovies(data.results);
            }

            // 실패했을 때
            catch {
                setIsError(true);
            } 
            
            // 모든 구문에 공통으로 해야 하는 상황
            finally {
                setIsPending(false);
            }

        };

        fetchMovies();

    // category가 바뀔 때도 useEffect가 다시 시작되어야지 페이지에 따른 영화가 다르게 나옴
    }, [page, category]);

    /*
    if (isPending) {
        return <LoadingSpinner />;
    }
    */

    if (isError) {
        return (
            <div>
                <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        );
    }
    
    /* 아래 코드를 여기에 안 적는 이유: 데이터와 상관 없는 페이지 이동 부분도 없어짐
    if (isPending) {
        return (
            <div>
                <LoadingSpinner />
            </div>
        );
    }
    */

    return (
        <>
            {/* 페이지 이동 화살표 + 현재 페이지 */}
            <div className='flex items-center justify-center gap-6 mt-5'>
                <button 
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed'
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}>
                    {`<`}</button>
                <span>{page} 페이지</span>
                <button 
                className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
                onClick={() => setPage((prev) => prev + 1)}>
                    {`>`}</button>
            </div>

            {/* 로딩 여부를 삼항 연산자로 표현할 수 있으나 가독성이 안 좋으므로 아래의 코드로 작성함 */}
            {/* 로딩 중일 때 */}
            {isPending && (
                <div className='flex items-center justify-center h-dvh'>
                    <LoadingSpinner />
                </div>
            )}

            {/* 로딩 중 아닐 때 */}
            {!isPending && (
                <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-5 xl:grid-cols-6'>
                    {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );

}