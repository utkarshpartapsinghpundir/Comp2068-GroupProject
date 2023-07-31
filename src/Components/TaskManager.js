import React, { useEffect, useState } from 'react';
import PopupTask from '../popups/PopupTask';
import Boxes from './Boxes';

const TaskManager = () => {
  // State hooks for managing the modal and task list
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    let arr = localStorage.getItem('taskList');

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  // Delete a task from the task list
  const deleteTask = (index) => {
    let tempList = [...taskList]; // Create a copy of the task list to avoid mutation
    tempList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  // Update a task in the task list
  const updateListArray = (obj, index) => {
    let tempList = [...taskList]; // Create a copy of the task list to avoid mutation
    tempList[index] = obj;
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  // Toggle the modal visibility
  const toggle = () => {
    setModal(!modal);
  };

  // Save a new task to the task list
  const saveTask = (taskObj) => {
    let tempList = [...taskList]; // Create a copy of the task list to avoid mutation
    tempList.push(taskObj);
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  return (
    <>
      {/* Header */}
      <div className="header text-center">
        <h3 className="mt-3"> Welcome to our Task Manager!</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
      </div>

      {/* Task container */}
      <div className="task-container">
        {/* Display task list using the "Boxes" component */}
        {taskList && taskList.map((obj, index) => (
          <Boxes
            key={index} // Make sure to provide a unique key prop when using map()
            taskObj={obj}
            index={index}
            deleteTask={deleteTask}
            updateListArray={updateListArray}
          />
        ))}
      </div>

      {/* PopupTask component */}
      <PopupTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TaskManager;
