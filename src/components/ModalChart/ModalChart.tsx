import * as React from 'react';

import { getTodoCounts } from '../../utils';
import { ITodo } from '../../App';
import './ModalChart.css';

interface IProps {
   onClose: () => void;
   todos: Array<ITodo>;
}

interface IData {
   key: string;
   count: number;
   percentage: number;
   color: string;
}

const ModalChart: React.FC<IProps> = ({ todos, onClose }) => {
   const [all, active, completed] = getTodoCounts(todos);

   const percentages = {
      active: active !== 0 ? Math.round((active * 100) / all) : 0,
      completed: completed !== 0 ? Math.round((completed * 100) / all) : 0,
   };

   const styles = {
      backgroundImage: `conic-gradient(#7c69ef 0% ${percentages.completed}%, #ffc107 0% ${percentages.active}%)`,
   };

   const data: Array<IData> = [
      {
         key: 'All',
         count: all,
         percentage: 100,
         color: '#d9e2ef',
      },
      {
         key: 'Active',
         count: active,
         percentage: percentages.active,
         color: '#ffc107',
      },
      {
         key: 'Completed',
         count: completed,
         percentage: percentages.completed,
         color: '#7c69ef',
      },
   ];

   return (
      <div className="overlay">
         <div className="modal">
            <div className="pie" style={styles} />
            <div className="info">
               {data.map(({ key, count, percentage, color }) => (
                  <div key={key} className="data">
                     <div
                        className="color"
                        style={{ backgroundColor: color }}
                     />
                     <span className="filter-name">
                        {key}({percentage}%) - {count} todos
                     </span>
                  </div>
               ))}
            </div>
            <button className="exit" onClick={onClose}>
               &times;
            </button>
         </div>
      </div>
   );
};

export default ModalChart;
