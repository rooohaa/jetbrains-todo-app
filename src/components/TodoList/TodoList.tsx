import React from 'react';

import TodoItem from './TodoItem';
import BarChart from '../BarChart';

import { ITodo } from '../../App';
import { getTodoStatistics, IStatistics } from '../../utils';
import { days } from './mock';
import './TodoList.css';

interface IProps {
   todos: Array<ITodo>;
   onDelete: (id: string) => void;
   onComplete: (id: string) => void;
   filter: string;
}

const TodoList: React.FC<IProps> = ({
   todos,
   onDelete,
   onComplete,
   filter,
}) => {
   let data: IStatistics;

   if (filter === 'completed') {
      data = getTodoStatistics(todos);
   }

   return (
      <section className="list-section">
         {todos.length === 0 && (
            <h3 className="message">
               You have no {filter !== 'all' && filter} tasks yet 🤨
            </h3>
         )}
         <div className="container">
            <ul className="todo-list">
               {todos.map(({ id, title, completed, createdAt }) => (
                  <TodoItem
                     key={id}
                     id={id}
                     title={title}
                     isCompleted={completed}
                     createdAt={createdAt}
                     onDelete={onDelete}
                     onComplete={onComplete}
                  />
               ))}
            </ul>
         </div>
         {filter === 'completed' && (
            <div className="wrapper">
               <div className="bars">
                  {days.map(({ id, day }) => (
                     <BarChart key={id} todoCount={data[day]} />
                  ))}
               </div>
               <div className="days">
                  {days.map(({ id, day }) => (
                     <span className="day" key={id}>
                        {day}
                     </span>
                  ))}
               </div>
            </div>
         )}
      </section>
   );
};

export default TodoList;
