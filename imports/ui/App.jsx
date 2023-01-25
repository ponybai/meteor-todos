import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, {sort: {createAt: -1}}).fetch());
  const deleteTask =({_id}) => TasksCollection.remove(_id);

  const toggleChecked = ({ _id, isChecked}) => {
    TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
  }

  return (
    <div className='app'>
      <header>
        <div className='app-bar'>
          <div className='app-header'>
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>
    <div className='main'>
      <TaskForm />

      <ul className='tasks'>
        {tasks.map(task => <Task 
          key={ task._id } 
          task={task} 
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />)}
      </ul>

      </div>
    </div>
  );
};
