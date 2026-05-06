// 훅 사용 이유: 복잡한 것을 단일화하기

import './App.css';
import { WelcomeData } from './components/UserDataDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export function App () {
  return (
  <QueryClientProvider client={queryClient}>
    <WelcomeData />
  </QueryClientProvider>
  );
}

export default App;

// 이전 코드 = useCustomFetch 직접 사용 버전
// import { useCustomFetch } from './hooks/useCustomFetch';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// function App() {
//   const { data, isPending, isError } = useCustomFetch<User>(
//     'https://jsonplaceholder.typicode.com/users/1'
//   );

//   if (isError) {
//     return <div>응 에러야 고쳐!</div>
//   }

//   // 로딩 상태 처리 (데이터 크면 받아오는 데 오래 걸림)
//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <h1>Tanstack Query</h1>
//     {data?.name}
//     </>
//   );
// }

// export default App;

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div>
//         week6
//       </div>

//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// }

// export default App;
// 