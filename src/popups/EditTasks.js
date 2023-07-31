import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  // State hooks to manage task name and description
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  // Set initial state when the modal is opened
  useEffect(() => {
    setTaskName(taskObj.Name);
    setDescription(taskObj.Description);
  }, []);

  // Function to handle task update
  const handleUpdate = (e) => {
    e.preventDefault();
    let tempObj = {
      Name: taskName,
      Description: description
    };
    updateTask(tempObj);
  };

  return (
    // Edit Task Popup Modal
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        {/* Update button */}
        <Button color="primary" onClick={handleUpdate}>Update</Button>

        {/* Cancel button */}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
