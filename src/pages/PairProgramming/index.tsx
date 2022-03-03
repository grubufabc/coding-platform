import React, { useCallback } from 'react';
import Chat from './Chat';
import IDE, { IDEHandles } from '../../components/IDE';
import FormUser from './FormUser';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import io, { Socket } from 'socket.io-client';
import { API_URL } from '../../api';
import Header from '../../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

interface Environment {
	language: string;
	sourceCode: string;
	stdin: string;
	timestamp: number;
}

export interface Message {
	content: string;
	author: string;
}

export interface Avatar {
	color: string;
	name: string;
}

export interface User {
	id: string;
	avatar: Avatar;
}

export interface Room {
	id: string;
	environment: Environment;
	messages: Message[];
	users: User[];
}

const PairProgrammingMenu: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);

	const handleCreateRoom = () => {
		setLoading(true);
		const connection = io(`${API_URL}/`);
		connection.on('room-created', (data: any) => {
			setLoading(false);
			navigate(`${data.IDRoom}`, { replace: true });
		});
		connection.emit('create-room');
	};

	return (
		<React.Fragment>
			<Header />
			<div className="m-5">
				<h1 className="mb-5">Pair Programming</h1>
				{loading ? (
					<div className="d-flex align-items-center">
						<strong>Carregando ambiente ...</strong>
						<div
							className="spinner-border ms-5"
							role="status"
							aria-hidden="true"
						></div>
					</div>
				) : (
					<button
						className="btn btn-outline-dark btn-lg"
						onClick={handleCreateRoom}
					>
						Criar uma sala
					</button>
				)}
			</div>
		</React.Fragment>
	);
};

const PairProgramming: React.FC = () => {
	const { id } = useParams();
	const IDERef = React.useRef<IDEHandles>(null);
	const [IDRoom, setIDRoom] = React.useState<string>('');

	// Web Socket
	const [socket, setSocket] =
		React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
	const [room, setRoom] = React.useState<Room>();
	const [avatar, setAvatar] = React.useState<Avatar>({
		name: 'Anônimo',
		color: '#000000',
	});
	const [environment, setEnvironment] = React.useState<Environment>({
		sourceCode: '',
		language: '',
		stdin: '',
		timestamp: 0,
	});
	const { setMessage: ToastSetMessage } = useToast();

	React.useEffect(() => {
		const IDE = IDERef.current;
		if (!IDE) return;
		const { sourceCode, language, stdin } = environment;
		IDE.setCode(sourceCode, environment.timestamp);
		IDE.setLanguage(language);
		IDE.setStdin(stdin, environment.timestamp);
	}, [environment]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleEvents = {
		'room-created': (data: any) => {
			// console.log(`room-created => data:`, data)
			setIDRoom(data.IDRoom);
		},
		'room-updated': (data: any) => {
			// console.log(`room-updated => data:`, data)
			setRoom(data as Room);
			setEnvironment(data.environment as Environment);
		},
		'user-info-updated': (data: any) => {
			if (!room) return;
			// console.log(`user-info-updated => data:`, data)
			setRoom({ ...room, users: data as User[] });
		},
		'room-changed': (data: any) => {
			// console.log(`room-changed => data:`, data)
			setRoom(data as Room);
		},
		'messages-updated': (data: any) => {
			// console.log(`messages-updated => data:`, data)
			setRoom((room) => {
				if (room === undefined) return undefined;
				room.messages = data as Message[];
				return { ...room };
			});
		},
		'environment-updated': (env: Environment) => {
			// console.log(`environment-updated => data:`, data)
			setRoom((room) => {
				if (!room) return room;
				room.environment = env;
				if (env.timestamp >= environment.timestamp) {
					setEnvironment(room.environment);
				}
				return { ...room };
			});
		},
	};

	const connect = useCallback((): Socket<
		DefaultEventsMap,
		DefaultEventsMap
	> => {
		if (socket) return socket;
		const connection = io(`${API_URL}/`);
		Object.entries(handleEvents).forEach(([observerName, fn]) => {
			connection.on(observerName, fn);
		});
		setSocket(connection);
		return connection;
	}, [handleEvents, socket]);

	const handleJoinToTheRoom = useCallback(
		(IDRoom: string) => {
			connect().emit('enter-room', IDRoom);
		},
		[connect]
	);

	React.useEffect(() => {
		if (!IDRoom) {
			handleJoinToTheRoom(id || '');
			setIDRoom(id || '');
		}
	}, [IDRoom, handleJoinToTheRoom, id]);

	const handleNewMessage = (content: string) => {
		connect().emit('new-message', { content });
	};

	const handleUpdateUser = (avatar: Avatar) => {
		connect().emit('update-user-info', { avatar });
	};

	const handleUpdateEnvironment = (environment: Environment) => {
		connect().emit('update-environment', environment);
	};

	const handleChangeIDE = (code: string, language: string, stdin: string) => {
		if (!room) return;
		handleUpdateEnvironment({
			sourceCode: code,
			language,
			stdin,
			timestamp: new Date().getTime(),
		});
	};

	const getURL = (): string => {
		return `${window.location.origin}/pair-programming/${IDRoom}`;
	};

	const handleShareRoom = () => {
		navigator.clipboard.writeText(getURL());
		ToastSetMessage({
			title: 'Link copiado!',
			body: 'Link copiado para a área de transferência!',
		});
	};

	return (
		<React.Fragment>
			<Header />
			<div className="m-5">
				<div className="row">
					<div className="col-7">
						<IDE ref={IDERef} onChange={handleChangeIDE} />
					</div>
					<div className="col-5">
						<div className="d-grid mb-3">
							<button
								className="btn btn-outline-dark"
								onClick={handleShareRoom}
							>
								Copiar Link
							</button>
						</div>
						<FormUser
							avatar={avatar}
							setAvatar={(avatar: Avatar) => {
								setAvatar(avatar);
								handleUpdateUser(avatar);
							}}
						/>
						<Chat
							handleNewMessage={handleNewMessage}
							users={room?.users || []}
							messages={room?.messages || []}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export { PairProgramming, PairProgrammingMenu };
