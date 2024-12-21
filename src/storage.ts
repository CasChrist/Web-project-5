import { Task } from 'components/redux/taskSlice';

class TaskLocalStorage {
	private storageKey: string;

	constructor(storageKey: string) {
		this.storageKey = storageKey;
	}

	getTasks(): Task[] {
		const tasks = localStorage.getItem(this.storageKey);
		return tasks ? JSON.parse(tasks) : [];
	}

	addTask(task: Task): void {
		const tasks = this.getTasks();
		tasks.push(task);
		localStorage.setItem(this.storageKey, JSON.stringify(tasks));
	}

	deleteTask(taskID: number): void {
		let tasks = this.getTasks();
		tasks = tasks.filter((task) => task.id !== taskID);
		localStorage.setItem(this.storageKey, JSON.stringify(tasks));
	}

	updateTask(updatedTask: Task): void {
		let tasks = this.getTasks();
		tasks = tasks.map((task) =>
			task.id === updatedTask.id ? { ...task, ...updatedTask } : task
		);
		localStorage.setItem(this.storageKey, JSON.stringify(tasks));
	}

	setTasks(tasks: Task[]): void {
		localStorage.setItem(this.storageKey, JSON.stringify(tasks));
	}
}

const storage = new TaskLocalStorage('tasks');
// localStorage.clear();
export default storage;
