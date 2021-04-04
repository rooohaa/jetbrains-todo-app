import { ITodo } from '../App';

export async function getTodos() {
   const res = await fetch('http://localhost:5000/tasks');

   return await res.json();
}

export async function postTodo(todo: ITodo) {
   await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
         'Content-type': 'application/json',
      },
   });
}

export async function deleteTodo(id: string) {
   await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
   });
}

export async function completeTodo(id: string, newTodo: ITodo) {
   const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newTodo),
      headers: {
         'Content-type': 'application/json',
      },
   });

   return await res.json();
}
