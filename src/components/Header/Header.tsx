import React, { useState } from 'react';

import { ITodo } from '../../App';
import './Header.css';

import ModalChart from '../ModalChart';

interface IProps {
   title: string;
   todos: Array<ITodo>;
}

const Header: React.FC<IProps> = ({ title, todos }) => {
   const [modalIsActive, setModalIsActive] = useState<boolean>(false);

   return (
      <header>
         <div className="container">
            <h1 className="app-name">{title}</h1>
            <button className="show-btn" onClick={() => setModalIsActive(true)}>
               Show PieChart
            </button>
         </div>
         {modalIsActive && (
            <ModalChart todos={todos} onClose={() => setModalIsActive(false)} />
         )}
      </header>
   );
};

export default Header;
