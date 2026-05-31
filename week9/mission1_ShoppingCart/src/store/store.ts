import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';

// 1. 저장소 생성
function createStore() {
    const store = configureStore({
        // 2. 리듀서 설정
        reducer: {
            cart: cartReducer,
        },
    });

    return store;
}

// store를 활용할 수 있도록 내보내야 함
// 방법: 실행 후스토어를 빼주기
// 싱글톤패턴이라고 부름
const store = createStore();
export default store;

// 타입 받을 수 있기 위한 코드
// Infer the 'RootState' and AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;