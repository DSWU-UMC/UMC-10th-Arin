import { RequestSigninDto } from "../types/auth.ts";
import { createContext, PropsWithChildren } from "react";

interface AuthContextType {
    accessToken: string | null; // 있을 수도 있고 없을 수도 있음
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>; // 인자 없어서 () 안에 아무것도 안 적음
}

// 타입 전달
export const AuthContext = createContext<AuthContextType>( { 
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {
        // 아래와 이름이 동일하여 이름 변경
        getItem: getAccessTokenFromStorage, 
        setItem: setAccessTokenInStorage, 
        removeltem: removeAccessTokenFromStororage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        // 위와 이름이 동일하여 이름 변경
        getItem: getRefreshokenFromStorage, 
        setItem: setRefreshTokenInStorage, 
        removeltem: removeRefreshTokenFromStororage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    // 상태 만들기
    const [accessToken, setAccessToken] = useState<string | null>(
        // 지연 초기화 (상태 변화 발생 -> 랜더링 발생 -> but LocalStorage에 들어가는 값은 한번 값 넣어놓으면 페이지 이동때마다 랜더링될 필요 X
        getAccessTokenFromStorage().
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    // 로그인 함수
    const login = async (siginData: RequestSigninDto) => {
        try {
            const {data} = await postSingin(signinData);

            // 데이터를 올바르게 받아오면 로그인 성공
            if (data) {
                // 데이터 받아오기
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                // localStorage에 넣어주기
                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                // 상태 바꿔주기
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
            }
        } catch (error) {
            // 로그인 요청 실패
            console.log("로그인 오류", error);
        }
    };
};