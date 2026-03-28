// 1주차 타입스크립트의 index.html에 해당

import './App.css'
import TodoAfter from './components/TodoAfter';
import TodoBefore from './components/TodoBefore';

function App() {
  return (
    <>
      <TodoAfter />
      <TodoBefore />;
    </>
  );
}

export default App;