// 강의에서는 작성 안 한 'type' 추가 작성 이유: type 전용 import로 바꾸기
import { type FormEvent, useState } from 'react';
import type { TTodo } from '../types/todo';

const TodoBefore = () => {
    // 상태 3가지 관리 필요: 입력, 할 일, 완료
    const [input, setInput] = useState<string>('');
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [todos, setTodos] = useState<TTodo[]>([]);

    // 할 일 추가 버튼 누르면 입력값을 할 일 목록에 추가하기
    // e ~ 작성 이유: 기본 새로고침 막기 (암기 영역)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        // 할 일 추가 버튼 눌렀을 때 새로고침되는 것을 방지
        e.preventDefault();
        // 할 일 추가 text의 맨 앞 공백 제거
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = {id: Date.now(), text };
            //useState에 객체 넣기 (기존에 할 일에 있던 것들은 유지)
            setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]);
            // 할 일 추가 버튼 클릭 후 text 지우기 [공백으로 만들기]
            setInput('');
        }
    };

    // 할 일 목록에서 완료 버튼 누르면 완료 목록으로 넘어가기
    const completeTodo = (todo: TTodo) : void => {
        // 할 일 목록에 있는 것들 중 동일하지 않은 아이디는 할 일 목록에 그대로 남기기
        setTodos((prevTodos) : TTodo[] => 
            prevTodos.filter((t) : boolean => t.id !== todo.id));
        // 완료 목록에 옮기기
        // ...prevDoneTodos 작성 이유: 완료 목록에 있던 기존 것들의 불변성 지키기
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    };

    // 완료 목록에서 삭제 버튼 누르면 완료 목록에서 없애기
    const deleteTodo = (todo: TTodo) : void => {
        // 완료 목록에 있는 것들 중 동일하지 않은 아이디는 완료 목록에 그대로 남기기
        setDoneTodos((prevDoneTodo) : TTodo[] =>
            prevDoneTodo.filter((t) : boolean => t.id !== todo.id));
    };

    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>ARIN TODO</h1>
            {/* onSubmit 작성 이유: 할 일 추가 관련 코드 연결 */}
            <form onSubmit={handleSubmit} className='todo-container__form'>
                <input 
                    // 실제로 값을 넣을 수 있도록 연결 
                    value={input}
                    // 값이 변경될 때마다 인지
                    onChange={(e) : void => setInput(e.target.value)}
                    type='text' 
                    className='todo-container__input' 
                    placeholder="할 일 입력"
                    required
                 />
                <button type='submit' className='todo-container__button'>
                    할 일 추가
                </button>
            </form>
            <div className='render-container'>
                <div className='render-container__section'>
                    <h2 className='render-container__title'>할 일</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {/* todos가 복수인 이유: 할 일q 목록, 완료 목록에 객체 여러 개 들어갈 수 있음 
                        any 단수인 이유: map을 돌리면 하나하나 순회할 것임 = 객체 하나 가져올 것임
                        todo 뒤에 , idx 생략 이유: 사용 안 함 */}
                        {todos.map((todo) => (
                            <li key={todo.id} className='render-container__item'>
                            <span className='render-container__item-text'>{todo.text}</span>
                            {/* onClick 작성 이유: 할 일 추가->완료 관련 코드 연결 */}
                            <button
                                onClick={(): void => completeTodo(todo)}
                                style={{
                                    backgroundColor: '#28a745',
                                }}
                                className='render-container__item-button'
                            >완료</button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className='render-container__section'>
                    <h2 className='render-container__title'>완료</h2>
                    <ul id='todo-list' className='render-container__list'>
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className='render-container__item'>
                            <span className='render-container__item-text'>{todo.text}</span>
                            {/* onClick 작성 이유: 완료->완전 삭제 관련 코드 연결 */}
                            <button
                                onClick={(): void => deleteTodo(todo)}
                                style={{
                                    backgroundColor: '#dc3545',
                                }}
                                className='render-container__item-button'
                            >삭제</button>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoBefore;