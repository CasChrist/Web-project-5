import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../../storage';

export interface Task {
	id: number;
	title: string;
	description: string;
	isPinned?: boolean;
}

const taskSlice = createSlice({
	name: 'tasks',
	initialState: storage.getTasks() || [],
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			const newTask = action.payload;
			state.push(newTask);
			storage.addTask(newTask);
		},

		deleteTask: (state, action: PayloadAction<number>) => {
			storage.deleteTask(action.payload);
			return state.filter((task) => task.id !== action.payload);
		},

		updateTask: (state, action: PayloadAction<Task>) => {
			const { id, title, description } = action.payload;
			const taskIndex = state.findIndex((task) => task.id === id);
			if (taskIndex !== -1) {
				state[taskIndex] = { id, title, description };
				storage.updateTask(action.payload);
			}
		},

		reorderTasks: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const [movedTask] = state.splice(fromIndex, 1);
			state.splice(toIndex, 0, movedTask);
			console.log('Reordering from:', fromIndex, 'to:', toIndex);
			storage.setTasks(state);
			console.log('Updated tasks:', state);
		},

		pinTask: (state, action: PayloadAction<Task>) => {
			const task = state.find((task) => task.id === action.payload.id);
			if (task && !task.isPinned) {
				const pinnedTasksCount = state.filter((task) => task.isPinned).length;
				if (pinnedTasksCount < 3) {
					task.isPinned = true;
				}
			}
		},

		unpinTask: (state, action: PayloadAction<{ id: number }>) => {
			const task = state.find((task) => task.id === action.payload.id);
			if (task) {
				task.isPinned = false;
			}
		},
	},
});

export const { addTask, deleteTask, updateTask, reorderTasks, pinTask, unpinTask } =
	taskSlice.actions;

export default taskSlice.reducer;
