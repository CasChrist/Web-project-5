import React, { useState } from 'react';
import EditTask from './editTask';
import ActionBar from './actionBar';
import ViewTask from './viewTask';
import { useDispatch } from 'react-redux';
import { Task, deleteTask as deleteTaskAction } from './redux/taskSlice';
import ConfirmationModal from './confirmationModal';

interface TaskItemProps {
	key: number,
	task: Task;
	onDrop: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragStart: (e: React.DragEvent) => void;
	onDragEnd: () => void;
	isDragging: boolean;
	draggable: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onDrop,
	onDragOver,
	onDragStart,
	onDragEnd,
	isDragging,
}) => {
	const [showActions, setShowActions] = useState<boolean>(false);
	const [showViewTask, setShowViewTask] = useState<boolean>(false);
	const [showEditTask, setShowEditTask] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const dispatch = useDispatch();

	const toggleActions = () => {
		setShowActions(!showActions);
	};

	const openViewTask = () => {
		setShowViewTask(true);
	};

	const closeViewTask = () => {
		setShowViewTask(false);
	};

	const openEditTask = () => {
		setShowEditTask(true);
	};

	const closeEditTask = () => {
		setShowEditTask(false);
	};

	const openConfirmationModal = () => {
		setShowConfirmation(true);
	};

	const closeConfirmationModal = () => {
		setShowConfirmation(false);
	};

	const handleDelete = () => {
		dispatch(deleteTaskAction(task.id));
		closeConfirmationModal();
	};

	return (
		<div
			className={`tasks-elem-container ${isDragging ? 'dragging' : ''}`}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable={true}>
			<div
				className="outline tasks-elem-container-shape"
				data-id={task.id}
				onClick={toggleActions}>
				<div className="tasks-elem-container-text">
					<h3>{task.title}</h3>
					<p>{task.description}</p>
				</div>
				<button
					className="tasks-elem__delete outline"
					onClick={openConfirmationModal}>
					X
				</button>
			</div>

			{showActions && (
				<ActionBar
					taskID={task.id}
					onEdit={openEditTask}
					onView={openViewTask}
				/>
			)}

			{showViewTask && <ViewTask task={task} onClose={closeViewTask} />}

			{showEditTask && <EditTask task={task} onClose={closeEditTask} />}

			{showConfirmation && (
				<ConfirmationModal
					message="Delete this task?"
					onConfirm={handleDelete}
					onCancel={closeConfirmationModal}
				/>
			)}
		</div>
	);
};

export default TaskItem;
