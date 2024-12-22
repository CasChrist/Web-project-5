import React, { useState } from 'react';
import TaskItem from './taskItem';
import { useDispatch } from 'react-redux';
import { reorderTasks, Task, pinTask, unpinTask } from './redux/taskSlice';

interface TaskListProps {
	tasks: Task[];
}

// OH MY GOD!!! DRAGGING FINALLY WORKSSSS!!!!!
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
	const dispatch = useDispatch();
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

	const handleDrop = (e: React.DragEvent<Element>, index: number) => {
		e.preventDefault();
		if (draggingIndex !== null && draggingIndex !== index) {
      dispatch(reorderTasks({ fromIndex: draggingIndex, toIndex: index }));
    }
		setDraggingIndex(null);
	};

	const handleDragStart = (e: React.DragEvent<Element>, index: number) => {
		e.dataTransfer.setData('text/plain', index.toString());
		console.log(index);
		setDraggingIndex(index);
	};

	const handleDragEnd = () => {
		setDraggingIndex(null);
	};

	const handleDragOver = (e: React.DragEvent<Element>) => {
		e.preventDefault();
	}

	const handlePinTask = (task: Task) => {
		if (task.isPinned) {
			dispatch(unpinTask(task))
		} else {
			dispatch(pinTask(task))
		}
	};

	const sortedTasks = [...tasks].sort((a, b) => {
		return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
	});

	return (
		<div className="tasks">
			{sortedTasks.length === 0 ? (
				<p className="tasks-none">No tasks</p>
			) : (
				sortedTasks.map((task, index) => (
					<TaskItem
						key={task.id}
						task={task}
						onDrop={(e) => handleDrop(e, index)}
						onDragOver={handleDragOver}
						onDragStart={(e) => handleDragStart(e, index)}
						onDragEnd={handleDragEnd}
						draggable={true}
						isDragging={draggingIndex === index}
						pinTask={() => handlePinTask(task)}
					/>
				))
			)}
		</div>
	);
};

export default TaskList;
