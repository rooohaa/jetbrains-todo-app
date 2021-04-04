import React from 'react';

import './TodoItem.css';

interface IProps {
   id: string;
   title: string;
   isCompleted: boolean;
   createdAt: string;
   onDelete: (id: string) => void;
   onComplete: (id: string) => void;
}

const TodoItem: React.FC<IProps> = ({
   id,
   title,
   isCompleted,
   createdAt,
   onDelete,
   onComplete,
}) => {
   return (
      <div className="wrap">
         <li
            className={`todo-item ${isCompleted ? 'completed' : ''}`}
            onClick={() => onComplete(id)}
         >
            <span className="title">{title}</span>
         </li>
         <button className="delete-btn" onClick={() => onDelete(id)}>
            <i className="fas fa-trash"></i>
         </button>
      </div>
   );
};

export default TodoItem;
