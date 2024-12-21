import React from 'react';

interface ShareTaskProps {
	taskID: number;
	onClose: () => void;
}

const ShareTask: React.FC<ShareTaskProps> = ({ taskID, onClose }) => {
	const handleShare = (platform: string) => {
		onClose();
	};

	return (
		<>
			<div className="share">
				<div className="share__content">
					<button
						className="share__icons"
						onClick={() => handleShare('clipboard')}>
						<img src="./src/assets/copy.svg" alt="Copy to clipboard" />
					</button>
					<button className="share__icons" onClick={() => handleShare('vk')}>
						<img src="./src/assets/vk.svg" alt="VK" />
					</button>
					<button
						className="share__icons"
						onClick={() => handleShare('telegram')}>
						<img src="./src/assets/telegram.svg" alt="Telegram" />
					</button>
					<button
						className="share__icons"
						onClick={() => handleShare('whatsapp')}>
						<img src="./src/assets/whatsapp.svg" alt="WhatsApp" />
					</button>
					<button
						className="share__icons"
						onClick={() => handleShare('facebook')}>
						<img src="./src/assets/facebook.svg" alt="Facebook" />
					</button>
				</div>
			</div>
			<div className="overlay" onClick={onClose}></div>
		</>
	);
};

export default ShareTask;
