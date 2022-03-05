import React, { createContext, ReactNode, useContext } from 'react';

declare var bootstrap: any;

interface Message {
	title: string;
	body: string;
	icon?: string | React.ReactNode;
}

interface ToastContextData {
	message: Message;
	setMessage: (message: Message) => void;
}

interface ToastProviderProps {
	children: ReactNode;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

interface ToastProps {
	message: Message;
	setRef: (ref: any) => void;
	is_visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, setRef, is_visible }) => {
	const ref = React.useRef(null);

	React.useEffect(() => {
		setRef(ref);
	}, [ref, setRef]);

	return (
		<div
			className="bg-dark position-fixed fixed-bottom"
			style={{
				zIndex: is_visible ? 1000 : -1,
			}}
		>
			<div className="toast-container position-absolute p-3 bottom-0 end-0">
				<div
					ref={ref}
					className="toast"
					role="alert"
					aria-live="assertive"
					aria-atomic="false"
				>
					<div className="toast-header">
						<span className="me-2">{message.icon}</span>
						<strong className="me-auto">{message.title}</strong>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="toast"
							aria-label="Close"
						></button>
					</div>
					<div className="toast-body">{message.body}</div>
				</div>
			</div>
		</div>
	);
};

export function ToastProvider({ children }: ToastProviderProps) {
	const [content, setContent] = React.useState<Message>({
		title: '',
		body: '',
	});
	const [toastRef, setToastRef] = React.useState({ current: null });
	const [isVisible, setIsVisible] = React.useState(false);
	const [time, setTime] = React.useState<any>(null);

	const setMessage = (message: Message) => {
		if (!toastRef.current) return;
		const toast = new bootstrap.Toast(toastRef.current);
		toast.show();
		setContent(message);

		setIsVisible(true);

		if (time) clearTimeout(time);

		setTime(
			setTimeout(() => {
				setIsVisible(false);
			}, 3000)
		);
	};

	return (
		<ToastContext.Provider
			value={{
				message: content,
				setMessage,
			}}
		>
			{children}
			<Toast message={content} setRef={setToastRef} is_visible={isVisible} />
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	return context;
}
