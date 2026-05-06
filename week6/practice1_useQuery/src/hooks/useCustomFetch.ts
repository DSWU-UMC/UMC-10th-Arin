// useQuery를 이용하여 데이터 받아오기
// 서버 상태 관리에 필요한 복잡한 절차적 로직을 추상화함
// 선언적인 API 제공

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export const useCustomFetch = <T>(url:string) : UseQueryResult<T, Error> => {
    return useQuery({
        // local Storage의 url 기반
        queryKey: [url],

        // query 함수
        queryFn: async({ signal }) : Promise<T> => {
            // 데이터 요청 함수를 비동기 함수로 전달
            const response = await fetch(url, { signal });

            // 400, 500 error
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            return response.json() as Promise<T>;
        },

        // 재시도
        retry: 3,

        // 지수 백오프 전략 문제점) retry가 10이면 나중 가서는 1024초 기다려야 함
        retryDelay: (attemptIndex) => {
            return Math.min(1000 * Math.pow(2, attemptIndex), 30_000); // 30초 이내로 기다림 작동
        },
    
        // 캐싱되는 시간
        staleTime: 5 * 60 * 1_000, // 5분

        // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거됨
        gcTime: 10 * 60 * 1_000, // staleTime보다 큰 값
    });
};



/* Qeury를 이용함으로서 사용 X
// 캐싱을 이용하여 불필요한 데이터 요청 

import { useEffect, useMemo, useRef, useState } from 'react';

// 데이터를 몇 분동안 유지할건지
const STALE_TIME = 5 * 60 * 1_000; // 5 minutes

// 최대 횟수
const MAX_RETRIES = 3; 
// 1초마다 재시도
const INITIAL_RETRY_DELAY = 1_000; 


// 로컬 스토리지에 저장할 데이터의 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number; // 마지막으로 데이터를 가져온 시점의 시점 = 타임스탬프
}

// 여러 interface 들어올 수 있으므로 User 대신 T 작성 => 범용성 높이기
export const useCustomFetch = <T>(url: string) : {data: T|null; isPending: boolean, isError: boolean} => {
    const [data, setData] = useState<T | null>(null); 
    const [isPending, setIsPending ] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // url을 저장하는 key
    // url이 달라질 때마다 값 저장될 걸 실행시켜! (useEffect와 비슷)
    const storageKey = useMemo(() : string => url, [url]); // url 말고 useMemo 사용 이유) url이 같으므로 재생성될 필요 없음

    // race condition 방지를 위한 Ref 선언 -> 이유) 리랜더링이되어도 그 값 유지 ㄱㄴ = fetch 요청을 취소하기 위한 어볼트 controller 저장할 수 있는 Ref 만들기
    const abortControllerRef = useRef<AbortController | null>(null);

    // 횟수 저장을 state로 관리 -> 값 날라감 => Ref로 관리
    const retryTimeoutRef = useRef<number | null>(null);


    // 부수 효과
    useEffect(() => {
        // 
        abortControllerRef.current = new AbortController();

        setIsError(false);

        const fetchData = async (currentRetry = 0) : Promise<void> => { // 몇 번 재시도할지 currentRetry 이용
            // 캐시 됐는지 안 됐는지 여부 판단
            // 캐시됨 -> 캐시된 데이터 내리기 / 캐시되지 X -> 데이터 fetch 요청
            const currentTime = new Date().getTime(); // 현재 시간
            const cachedItem = localStorage.getItem(storageKey); // url

            // 캐시 데이터 확인, 신선도 검증
            if (cachedItem) {
                try {
                    const cachedData: CacheEntry<T> = JSON.parse(cachedItem); // localStorage에 저장할 때는 직렬화함 -> parsing해서 꺼내줌4

                    // 캐시가 신선한 경우 (STALE_TIME 이내)
                    if (currentTime - cachedData.lastFetched < STALE_TIME) {
                        setData(cachedData.data);
                        setIsPending(false);
                        console.log('케시된 데이터 사용', url);
                        return;
                    }

                    // 캐시가 만료된 경우
                    setData(cachedData.data);
                    console.log('만료된 캐시 데이터 사용', url);
                } catch {
                    // 캐싱된 데이터 빼기
                    localStorage.removeItem(storageKey);
                    console.warn('캐시 에러: 캐시 삭제함', url);
                }
            }

            setIsPending(true);

            try {
                const response = await fetch(url, {
                    signal: abortControllerRef.current?.signal,
                });

                // error 잡기
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // fetch는 json 형태로 한번 풀어줘야 함
                const newData = await response.json() as T; // User -> T
                setData(newData);

                // 네트워크 요청 후 캐싱하기 = localStorge에 setItem하기
                const newCacheEntry: CacheEntry<T> = {
                    data: newData, 
                    lastFetched: new Date().getTime(), // 현재 시간을 타임스탬프로 저장
                };

                localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
            } catch (error) {
                // abortController (= 요청이 취소된 경우)는 error에 잘 안 잡힘 -> 이를 잡기 위한 코드
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('요청 취소됨', url);

                    return;
                }

                // 재시도 로직 
                if (currentRetry < MAX_RETRIES) { // 3번 진행
                    // 지수 back-off 방식 (1초 -> 2초 -> 4초 -> 8초 -> ...) = 요청 점점 느려짐
                    const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
                    console.log(`재시도, ${currentRetry + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`);

                    retryTimeoutRef.current = setTimeout(() : void => {
                        fetchData(currentRetry + 1);
                    }, retryDelay )
                } else {
                    // 최대 재시도 횟수 초과
                    setIsError(true);
                    setIsPending(false);
                    console.log('최대 재시도 횟수 초과', url);
                    return;
                }

                setIsError(true); // user이 11이상일 경우
                console.log(error);
            } finally {
                // try 끝부분, catch 끝부분 모두 네트워크 요청 종료를 나타내는 아래 문장을 작성할 것이기 때문에 묶기
                // try, cath 종료 후 모두 아래 문장으로 이동
                setIsPending(false);
            }
        };

        fetchData();

        // Ref는 메모리상에 계속 남아있어서, useEffect 쓸 때 clean up 필요함
        return () => {
            abortControllerRef.current?.abort();

            // 예약된 재시도 타이머 취소
            if (retryTimeoutRef.current !== null) {
                clearTimeout(retryTimeoutRef.current); // 시간(초) 도는 메모리 정리
                retryTimeoutRef.current = null;
            }
        };

    }, [url, storageKey]);

  return { data, isPending, isError };
};
*/