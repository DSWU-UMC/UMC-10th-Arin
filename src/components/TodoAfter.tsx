// 컴포넌트 사용 이유: 컴포넌트마다 역할, 책임 명확해짐 [명확하게 보임]

// 강의에서는 작성 안 한 'type' 추가 작성 이유: type 전용 import로 바꾸기
import { type FormEvent, useState } from 'react';
import type { TTodo } from '../types/todo';
import { type FormEvent, useState } from 'react';
import type { TTodo } from '../types/todo';

const TodoAfter = () => {
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
            <TodoForm />
            <div className='render-container'>
                <TodoList
                title='할 일'
                todos={todos}
                buttonLabel='완료'
                buttonColor='#28a745'
                onClick={completeTodo}
                />
                <TodoList
                title='완료'
                todos={doneTodos}
                buttonLabel='삭제'
                buttonColor='#28a745'
                onClick={deleteTodo}
                />
            </div>
        </div>
    );
};

export default TodoAfter;