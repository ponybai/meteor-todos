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
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {tasks.map(task => <Task 
          key={ task._id } 
          task={task} 
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />)}
      </ul>
    </div>
  );
};
