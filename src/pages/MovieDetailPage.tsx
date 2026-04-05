// useParams + 2개 API 동시 호출 + 로딩/에딩 처리

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import type { MovieDetail, Credits } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
    // 1. URL에서 movieId 꺼내기
    const { movieId } = useParams<{ movieId: string }>();

    // 2. 상태 정의
    const [ movie, setMovie ] = useState<MovieDetail | null>(null);
    const [ credits, setCredits ] = useState<Credits | null>(null);
    const [ isPending, setIsPending ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    // 3. movieId 바뀔 때마다 API 호출
    useEffect(() => {
        const fetchDetail = async () => {
            setIsPending(true);
            setIsError(false);

            try {
                const headers= {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                };

                // API 2개 동시 호출 (Promise.all)
                const [ movieRes, creditsRes] = await Promise.all([
                    axios.get<MovieDetail>(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        { headers }
                    ),
                    axios.get<Credits>(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                        { headers }
                    ),
                ]);

                setMovie(movieRes.data);
                setCredits(creditsRes.data);
            }

            catch {
                setIsError(true);
            }

            finally {
                setIsPending(false);
            }
        };

        if (movieId) fetchDetail();
    }, [movieId]);

    // 4. 로딩/에러 처리
    if (isPending) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <span className='text-red-500 text-xl'>에러가 발생했습니다</span>
            </div>
        );
    }

    // 5. 정상 페이지
    return (
        <div className='p-6 max-w-3xl mx-auto'>

        {/* 상단: 포스터 + 기본 정보 */}
        <div className='flex gap-6'>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className='w-40 rounded-xl shadow-lg flex-shrink-0'
            />
            <div>
                <h1 className='text-2xl font-bold'>{movie.title}</h1>
                {movie.tagline && (
                    <p className='text-gray-500 italic mt-1'>{movie.tagline}</p>
                )}
            <div className='flex gap-2 mt-2 flex-wrap'>
                {movie.genres.map((g) => (
                <span key={g.id} className='bg-[#b2dab1] text-white text-xs px-2 py-1 rounded-full'>
                    {g.name}
                </span>
                ))}
            </div>
            <p className='mt-2 text-sm text-gray-600'>
                {movie.vote_average.toFixed(1)} · {movie.runtime}분 · {movie.release_date}
            </p>
            <p className='mt-3 text-sm leading-relaxed'>{movie.overview}</p>
            </div>
        </div>

        {/* 출연진 */}
        {credits && (
            <div className='mt-8'>
                <h2 className='text-lg font-bold mb-3'>출연진</h2>
                <div className='flex gap-4 overflow-x-auto pb-2'>
                    {credits.cast.slice(0, 10).map((person) => (
                    <div key={person.id} className='flex-shrink-0 text-center w-16'>
                        <img
                            src={
                            person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : '/no-image.png'  // 사진 없으면 기본 이미지
                            }
                            alt={person.name}
                            className='w-14 h-14 rounded-full object-cover mx-auto border-2 border-[#b2dab1]'
                        />
                        <p className='text-xs mt-1 font-medium line-clamp-2'>{person.name}</p>
                        <p className='text-xs text-gray-400 line-clamp-1'>{person.character}</p>
                    </div>
                ))}
                </div>
            </div>
        )}

    </div>
  );
};

export default MovieDetailPage;