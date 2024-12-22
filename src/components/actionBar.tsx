import React, { useState } from 'react';
import ShareTask from './shareTask';

interface ActionBarProps {
	taskID: number;
	onEdit: () => void;
	onView: (taskID: number) => void;
	onPin: (taskID: number) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ taskID, onEdit, onView, onPin }) => {
	const [showShareTask, setShowShareTask] = useState<boolean>(false);

	const toggleShareTask = () => {
		setShowShareTask(!showShareTask);
	};

	return (
		<>
			<div className="tasks-elem-container__actions">
				<button
					className="tasks-elem-container__actions-details"
					onClick={() => onView(taskID)}>
					i
				</button>
				<button className="tasks-elem-container__actions-edit" onClick={onEdit}>
					<img src="./src/assets/edit.svg" alt="Edit" />
				</button>
				<button
					className="tasks-elem-container__actions-share"
					onClick={toggleShareTask}>
					<img src="./src/assets/share.svg" alt="Share" />
				</button>
				<button
					className="tasks-elem-container__actions-pin"
					onClick={() => onPin(taskID)}>
						<img src="./src/assets/heart.png" alt="Pin" />
					</button>
			</div>

			{showShareTask && <ShareTask taskID={taskID} onClose={toggleShareTask} />}
		</>
	);
};

export default ActionBar;
