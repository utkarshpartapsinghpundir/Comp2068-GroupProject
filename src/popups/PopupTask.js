import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PopupTask1 = ({ modal, toggle, save }) => {
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

  // Function to handle task save
  const handleSave = (e) => {
    e.preventDefault();
    let taskObj = {
      Name: taskName,
      Description: description
    };
    save(taskObj);
  };

  return (
    // Task creation Popup Modal
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
        {/* Create button */}
        <Button color="primary" onClick={handleSave}>Create</Button>

        {/* Cancel button */}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PopupTask1;
