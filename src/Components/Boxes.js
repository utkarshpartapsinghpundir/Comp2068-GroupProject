import React, { useState } from 'react';
import EditTask from '../popups/EditTasks';

const Boxes = ({ taskObj, index, deleteTask, updateListArray }) => {
  // State hook to manage the modal visibility
  const [modal, setModal] = useState(false);

  // Define an array of colors for the boxes
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ];

  // Toggle the modal visibility
  const toggle = () => {
    setModal(!modal);
  };

  // Update a task in the task list
  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  // Handle the delete button click
  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    // Task box wrapper
    <div className="box-wrapper mr-5">
      {/* Colored box at the top */}
      <div className="box-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>

      {/* Task content holder */}
      <div className="task-holder">
        {/* Box header */}
        <span
          className="box-header"
          style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px" }}
        >
          {taskObj.Name}
        </span>

        {/* Task description */}
        <p className="mt-3">{taskObj.Description}</p>

        {/* Edit and Delete icons */}
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {/* Edit icon */}
          <i
            className="far fa-edit"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>

          {/* Delete icon */}
          <i
            className="fas fa-trash-alt"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>

      {/* EditTask popup */}
      <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
    </div>
  );
};

export default Boxes;
