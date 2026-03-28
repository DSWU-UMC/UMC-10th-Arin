// 외부에서 사용할 수 있도록 export

// Todo.tsx의 import할 때의 Todo와 const할 때의 Todo 이름 겹침
// => todo.ts의 Todo 앞에 T 붙이기 

export type TTodo = {
    id: number;
    text: string;
};