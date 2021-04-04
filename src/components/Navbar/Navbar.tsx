import React, { useState } from 'react';

import { ITodo } from '../../App';

import { getTodoCounts } from '../../utils';
import { navItems } from './mock';
import './Navbar.css';

interface IProps {
   onTabChange: (tabIndex: number) => void;
   todos: Array<ITodo>;
}

const Navbar: React.FC<IProps> = ({ onTabChange, todos }) => {
   const [activeTab, setActiveTab] = useState<number>(0);
   const counts = getTodoCounts(todos);

   const triggerTab = (e: React.SyntheticEvent<EventTarget>) => {
      if (!(e.target instanceof HTMLButtonElement)) {
         return;
      }

      if (e.target.dataset.index) {
         const idx = +e.target.dataset.index;

         setActiveTab(idx);
         onTabChange(idx);
      }
   };

   return (
      <nav>
         <div className="container">
            <ul className="list">
               {navItems.map(({ id, name }) => (
                  <li
                     className={`list-item ${id === activeTab ? 'active' : ''}`}
                     key={id}
                  >
                     <button
                        className="nav-btn"
                        data-index={id}
                        onClick={triggerTab}
                     >
                        {name}
                     </button>

                     <span className="count">{counts[id]}</span>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;
