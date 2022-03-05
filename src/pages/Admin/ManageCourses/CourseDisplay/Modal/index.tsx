import React, { useState } from 'react';

declare var bootstrap: any;

interface ModalBootstrap {
	show: () => void;
	hide: () => void;
}

interface ModalProps {
	title: string;
	body: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	actionConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
	open,
	setOpen,
	title,
	body,
	actionConfirm,
}) => {
	const modalRef = React.useRef(null);
	const [modal, setModal] = useState<ModalBootstrap>();

	React.useEffect(() => {
		if (modalRef) {
			setModal(new bootstrap.Modal(modalRef.current));
		}
	}, [modalRef]);

	React.useEffect(() => {
		if (!modal) return;
		if (open) modal.show();
		else modal.hide();
	}, [open, modal]);

	return (
		<div
			ref={modalRef}
			className="modal"
			data-bs-backdrop="static"
			tabIndex={-1}
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setOpen(false)}
						/>
					</div>
					<div className="modal-body">
						<p>{body}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-danger"
							onClick={() => {
								actionConfirm();
								setOpen(false);
							}}
						>
							Excluir
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
