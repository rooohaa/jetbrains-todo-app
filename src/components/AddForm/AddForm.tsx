import React, { useState } from 'react';

import { getTodos } from '../../api';
import { getRandomId } from '../../utils';
import { ITodo } from '../../App';
import './AddForm.css';

interface IProps {
   onAdd: (todo: ITodo) => void;
}

const AddForm: React.FC<IProps> = ({ onAdd }) => {
   const [todoTitle, setTodoTitle] = useState<string>('');
   const [error, setError] = useState<string>('');
   const [success, setSuccess] = useState<boolean>(false);

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
   };

   const submitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault();

      const isValid = await validateForm();

      if (!isValid) {
         return;
      }

      const newTodo: ITodo = {
         id: getRandomId(),
         title: todoTitle,
         completed: false,
         createdAt: new Date().toDateString(),
         completedAt: '',
      };

      onAdd(newTodo);
      setSuccess(true);
      setTodoTitle('');
      setError('');

      setTimeout(() => {
         setSuccess(false);
      }, 1200);
   };

   const validateForm = async () => {
      if (todoTitle === '') {
         setError('Input field must not be empty.');
         return false;
      }

      try {
         const todos: ITodo[] = await getTodos();
         const exists = todos.find(
            (todo) =>
               todo.title.toLowerCase().trim() ===
               todoTitle.toLowerCase().trim()
         );

         if (exists) {
            setError('You already have this task.');
            return false;
         }
      } catch (err) {
         setError('Cannot access JSON server.');
         return false;
      }

      return true;
   };

   return (
      <section className="form-section">
         <div className="container">
            <form onSubmit={submitHandler}>
               <div className="form-control">
                  <input
                     type="text"
                     value={todoTitle}
                     onChange={changeHandler}
                     onBlur={() => setError('')}
                     placeholder="add todo"
                  />
                  <button className="add-btn" type="submit">
                     Add
                  </button>
               </div>
               {error && <p className="error">{error}</p>}
               {success && (
                  <p className="success">Your task successfully added.</p>
               )}
            </form>
         </div>
      </section>
   );
};

export default AddForm;
