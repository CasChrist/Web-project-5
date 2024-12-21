import React, { useState } from 'react';
import TaskItem from './taskItem';
import { useDispatch } from 'react-redux';
import { reorderTasks, Task } from './redux/taskSlice';

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

	return (
		<div className="tasks">
			{tasks.length === 0 ? (
				<p className="tasks-none">No tasks</p>
			) : (
				tasks.map((task, index) => (
					<TaskItem
						key={task.id}
						task={task}
						onDrop={(e) => handleDrop(e, index)}
						onDragOver={handleDragOver}
						onDragStart={(e) => handleDragStart(e, index)}
						onDragEnd={handleDragEnd}
						draggable={true}
						isDragging={draggingIndex === index}
					/>
				))
			)}
		</div>
	);
};

export default TaskList;
