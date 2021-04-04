import * as React from 'react';

import './BarChart.css';

interface IProps {
   todoCount: number;
}

const BarChart: React.FC<IProps> = ({ todoCount }) => {
   const HEIGHT_FACTOR: number = 50;
   const DEFAULT_HEIGHT: number = 4;

   const styles = {
      height: `${todoCount ? HEIGHT_FACTOR * todoCount : DEFAULT_HEIGHT}px`,
   };

   return (
      <div className="bar" style={styles}>
         <div className="prompt">{todoCount}</div>
      </div>
   );
};

export default BarChart;
