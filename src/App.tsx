import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask as addTaskAction } from './components/redux/taskSlice';
import CreateTask from './components/createTask';
import TaskList from './components/taskList';
import { RootState } from './components/redux/store';

const App: React.FC = () => {
	const tasks = useSelector((state: RootState) => state.tasks);
	const dispatch = useDispatch();

	const addTask = (task: {id: number, title: string, description: string }) => {
		dispatch(addTaskAction(task));
	};

	return (
		<div className="createTaskContainer">
			<CreateTask addTask={addTask} />
			<TaskList tasks={tasks} />
		</div>
	);
};

export default App;
