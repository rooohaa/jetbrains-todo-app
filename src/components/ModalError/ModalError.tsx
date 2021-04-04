import React from 'react';

import './ModalError.css';

interface IProps {
   errorDescription: string;
   onClose: () => void;
}

const ModalError: React.FC<IProps> = ({ errorDescription, onClose }) => {
   return (
      <div className="overlay">
         <div className="modal-error">
            <div className="error-icon">&times;</div>
            <h3 className="error-title">Server Error!</h3>
            <p className="error-descr">{errorDescription}</p>
            <button className="ok-btn" onClick={onClose}>
               OK
            </button>
         </div>
      </div>
   );
};

export default ModalError;
