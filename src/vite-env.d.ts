// 환경 변수 추가할 때마다 아래 코드 작성 (목적: 안전한 코드)
// 출처(?): 구글에 "vite의 환경변수 관리" 검색

interface ImportMetaEnv {
    // 변경 ㅂㄱ
    readonly VITE_TMDB_TOKEN: string;
}


interface ImportMeta {
    readonly env: ImportMetaEnv;
}