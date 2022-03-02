import React from 'react';
import { Avatar } from '..';

interface FormUserProps {
	avatar: Avatar;
	setAvatar: (avatar: Avatar) => void;
}

const FormUser: React.FC<FormUserProps> = ({ avatar, setAvatar }) => {
	return (
		<div className="mb-3">
			<div className="input-group mb-3">
				<input
					style={{ color: avatar.color }}
					type="text"
					className="form-control form-control-lg fw-bold"
					placeholder={'Digite seu nome'}
					value={avatar.name}
					onChange={({ target }) => {
						avatar.name = target.value;
						setAvatar({ ...avatar });
					}}
				/>
				<input
					type="color"
					className="form-control form-control-color form-control-lg"
					style={{ color: avatar.color }}
					value={avatar.color}
					onChange={({ target }) => {
						avatar.color = target.value;
						setAvatar({ ...avatar });
					}}
				/>
			</div>
		</div>
	);
};

export default FormUser;
