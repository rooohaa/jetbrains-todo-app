import { ITodo } from '../App';

interface IDay {
   [key: number]: string;
}

export interface IStatistics {
   [key: string]: number;
}

const daysMap: IDay = {
   0: 'Sun',
   1: 'Mon',
   2: 'Tue',
   3: 'Wed',
   4: 'Thu',
   5: 'Fri',
   6: 'Sat',
};

export function getRandomId(): string {
   return (new Date().getTime() / Math.random()).toString(16).replace('.', '');
}

export function filterList(todos: Array<ITodo>, filter: string): Array<ITodo> {
   switch (filter) {
      case 'active':
         return todos.filter((todo) => !todo.completed);
      case 'completed':
         return todos.filter((todo) => todo.completed);
   }

   return todos;
}

export function getTodoCounts(todos: Array<ITodo>): number[] {
   return [
      todos.length,
      todos.filter((todo) => !todo.completed).length,
      todos.filter((todo) => todo.completed).length,
   ];
}

export function getTodoStatistics(todos: Array<ITodo>): IStatistics {
   const weekDays: string[] = [];
   const statistics: IStatistics = {};

   todos.forEach((todo) => {
      const completedAt = new Date(todo.completedAt).getDay();
      weekDays.push(daysMap[completedAt]);
   });

   weekDays.forEach((weekDay) => {
      const count = countWeekDay(weekDays, weekDay);
      statistics[weekDay] = count;
   });

   return statistics;
}

function countWeekDay(weekDays: string[], day: string): number {
   let count = 0;

   for (let i = 0; i < weekDays.length; i++) {
      if (weekDays[i] === day) {
         count++;
      }
   }
   return count;
}
