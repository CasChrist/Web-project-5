import { createSlice } from '@reduxjs/toolkit';
import storage from '../../storage.js';

const taskSlice = createSlice({
	name: 'tasks',
	initialState: storage.getTasks() || [],
	reducers: {
		addTask: (state, action) => {
			const newTask = action.payload;
			state.push(newTask);
      storage.addTask(newTask);
		},

		deleteTask: (state, action) => {
			storage.deleteTask(action.payload);
			return state.filter((task) => task.id !== action.payload);
		},

		updateTask: (state, action) => {
			const { id, updates } = action.payload;
			storage.updateTask(id, updates);
			const task = state.find((task) => task.id === id);
			if (task) {
				Object.assign(task, updates);
			}
		},

		reorderTasks: (state, action) => {
			const { fromIndex, toIndex } = action.payload;
			const [movedTask] = state.splice(fromIndex, 1);
			state.splice(toIndex, 0, movedTask);
			storage.setTasks(state);
		},

		setTasks: (state, action) => {
			return action.payload;
		},
	},
});

export const { addTask, deleteTask, updateTask, reorderTasks, setTasks } =
	taskSlice.actions;

export default taskSlice.reducer;
