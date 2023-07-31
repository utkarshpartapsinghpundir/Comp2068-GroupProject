import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

test('renders "Task Manager" header', () => {
  render(<TaskManager />);
  const headerElement = screen.getByText(/Task Manager/i);
  expect(headerElement).toBeInTheDocument();
});

test('displays modal when "Create Task" button is clicked', () => {
  render(<TaskManager />);
  const createTaskButton = screen.getByText(/Create Task/i);

  fireEvent.click(createTaskButton);

  const modalElement = screen.getByRole('dialog');
  expect(modalElement).toBeInTheDocument();
});

test('adds a task when saving from the modal', () => {
  render(<TaskManager />);
  const createTaskButton = screen.getByText(/Create Task/i);

  fireEvent.click(createTaskButton);

  const taskInput = screen.getByLabelText(/Task Name/i);
  const saveButton = screen.getByText(/Save/i);

  const taskName = 'New Task';
  fireEvent.change(taskInput, { target: { value: taskName } });
  fireEvent.click(saveButton);

  // Verify that the new task is rendered on the page
  const newTaskElement = screen.getByText(taskName);
  expect(newTaskElement).toBeInTheDocument();
});

test('deletes a task when "Delete" button is clicked', () => {
  // Mock localStorage for the test
  const localStorageMock = {
    getItem: jest.fn().mockReturnValue('[]'),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

  // Set up initial task list
  const initialTasks = [{ taskName: 'Task 1' }, { taskName: 'Task 2' }];
  localStorage.setItem('taskList', JSON.stringify(initialTasks));

  render(<TaskManager />);

  // Verify that the initial tasks are rendered on the page
  const task1Element = screen.getByText('Task 1');
  const task2Element = screen.getByText('Task 2');
  expect(task1Element).toBeInTheDocument();
  expect(task2Element).toBeInTheDocument();

  // Delete the first task
  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  // Verify that the first task is removed from the page
  expect(task1Element).not.toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();

  // Verify that localStorage is updated with the new task list
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    'taskList',
    JSON.stringify([{ taskName: 'Task 2' }])
  );
});
