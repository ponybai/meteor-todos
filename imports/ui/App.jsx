import { Meteor } from 'meteor/meteor';
import React, {Fragment, useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id} : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter};

  const deleteTask =({_id}) => TasksCollection.remove(_id);

  const toggleChecked = ({ _id, isChecked}) => {
    TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
  }

  const tasks = useTracker(() => {
    if (!user){
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });


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

        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username || user.profile.name} 🚪
            </div>
            
            <TaskForm user={user} />

            <div className='filter'>
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            <ul className='tasks'>
              {tasks.map(task => <Task 
                key={ task._id } 
                task={task} 
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />)}
            </ul>
          </Fragment>
        ) : (
            <LoginForm />
        )}

      </div>


    </div>
  );
};
