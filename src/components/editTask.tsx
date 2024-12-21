import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from './redux/taskSlice.js';
import { Task } from './redux/taskSlice';

interface EditTaskProps {
	task: Task;
	onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
		}
	}, [task]);

	const handleSave = () => {
		const updatedTask = {
			id: task.id,
			title,
			description,
		};
		dispatch(updateTask(updatedTask));
		onClose();
	};

	return (
		<>
			<div className="modal">
				<div className="modal__content">
					<input
						id="editTitleInput"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						id="editDescriptionInput"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div id="modalButtons">
						<button id="saveButton" onClick={handleSave}>
							Save
						</button>
						<button id="closeModal" onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
			<div className="overlay" onClick={onClose}></div>
		</>
	);
};

export default EditTask;
