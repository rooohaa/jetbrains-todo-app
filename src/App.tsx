import React, { Fragment, useState, useEffect } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';
import ModalError from './components/ModalError';
import Spinner from './components/Spinner';

import * as api from './api';
import { filterList } from './utils';

export interface ITodo {
   id: string;
   title: string;
   completed: boolean;
   createdAt: string;
   completedAt: string;
}

const App: React.FC = () => {
   const [todos, setTodos] = useState<ITodo[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [filter, setFilter] = useState<string>('all');
   const [serverError, setServerError] = useState<string>('');

   useEffect(() => {
      setIsLoading(true);

      const fetchData = async () => {
         const data = await api.getTodos();
         setTodos(data);
      };

      fetchData()
         .then(() => setIsLoading(false))
         .catch(() => {
            setServerError(
               'Server error: Please run JSON server and try again.'
            );
            setIsLoading(false);
            setTodos([]);
         });
   }, []);

   const handleFilter = (idx: number): void => {
      switch (idx) {
         case 0:
            setFilter('all');
            break;
         case 1:
            setFilter('active');
            break;
         case 2:
            setFilter('completed');
            break;
      }
   };

   const addTodo = (todo: ITodo): void => {
      setTodos((prevState) => [...prevState, todo]);
      api.postTodo(todo);
   };

   const deleteTodo = (id: string): void => {
      setTodos(todos.filter((todo) => todo.id !== id));
      api.deleteTodo(id);
   };

   const completeTodo = async (id: string) => {
      const copy = [...todos];
      const currentTodo = copy.find((todo) => todo.id === id);

      if (currentTodo) {
         const updatedTodo: ITodo = {
            ...currentTodo,
            completed: !currentTodo.completed,
            completedAt: currentTodo.completed ? '' : new Date().toDateString(),
         };

         const data = await api.completeTodo(id, updatedTodo);

         setTodos(
            todos.map((todo) =>
               todo.id === id
                  ? {
                       ...todo,
                       completed: data.completed,
                       completedAt: data.completedAt,
                    }
                  : todo
            )
         );
      }
   };

   return (
      <Fragment>
         <Header title="#todo app" todos={todos} />
         <Navbar onTabChange={handleFilter} todos={todos} />
         <AddForm onAdd={addTodo} />
         {isLoading ? (
            <Spinner />
         ) : (
            <TodoList
               todos={filterList(todos, filter)}
               onDelete={deleteTodo}
               onComplete={completeTodo}
               filter={filter}
            />
         )}
         {serverError && (
            <ModalError
               errorDescription={serverError}
               onClose={() => setServerError('')}
            />
         )}
      </Fragment>
   );
};

export default App;
