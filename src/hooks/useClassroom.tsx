import React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from 'api';

interface Computer {
	id: string;
	name: string;
	classroomName: string;
	timestamp: number;
}

interface Environment {
	languageId: number;
	sourceCode: string;
	stdin: string;
	timestamp: number;
	stdout: string;
}

interface ClassroomProviderProps {
	children: ReactNode;
}

interface ClassroomContextData {
	createComputer: () => string;
	joinRoom: (classroomName: string) => void;
	computers: Computer[];
	changeEnvironment: (environment: Environment) => void;
	classroomName: string;
	environment: Environment;
	computerId: string;
	setComputerId: (computerId: string) => void;
	joinEnvironment: (computerId: string) => void;
	setEnvironment: (environment: Environment) => void;
	setLastUpdate: (lastUpdate: number) => void;
	lastUpdate: number;
	computer: Computer;
	changeComputer: (computer: Computer) => void;
}

const ClassroomContext = createContext<ClassroomContextData>(
	{} as ClassroomContextData
);

export function ClassroomProvider({ children }: ClassroomProviderProps) {
	const [computerId, setComputerId] = useState('');
	const [classroomName, setClassroomName] = useState('');
	const [lastUpdate, setLastUpdate] = React.useState(0);
	const [computer, setComputer] = React.useState<Computer>({
		id: '',
		name: '',
		classroomName: '',
		timestamp: 0,
	});
	const [environment, setEnvironment] = useState<Environment>(
		{} as Environment
	);
	const [computers, setComputers] = useState<Computer[]>([]);
	const [socket, setSocket] =
		useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

	const getComputerId = () => {
		let id = '';
		setComputerId((computerId) => {
			id = computerId;
			return computerId;
		});
		return id;
	};

	const getLastUpdate = () => {
		let update = 0;
		setLastUpdate((lastUpdate) => {
			update = lastUpdate;
			return lastUpdate;
		});
		return update;
	};

	const clear = () => {
		setComputer({ id: '', name: '', classroomName: '', timestamp: 0 });
		setComputerId('');
		setClassroomName('');
		setLastUpdate(0);
		setEnvironment({} as Environment);
		setComputers([]);
		setSocket(undefined);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleEvents = {
		'classroom.updated': (newComputers: Computer[]) => {
			setComputers(newComputers);
			const newComputer = newComputers.find(
				(computer) => computer.id === getComputerId()
			);
			if (newComputer) {
				setComputer(newComputer);
			}
		},
		'classroom.environment.updated': (newEnvironment: Environment) => {
			const lastUpdate = getLastUpdate();
			if (newEnvironment.timestamp > lastUpdate) {
				setEnvironment(newEnvironment);
				setLastUpdate(newEnvironment.timestamp);
			}
		},
	};

	const connect = React.useCallback((): Socket<
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

	const createComputer = () => {
		const computerId = uuidv4();
		connect().emit('classroom.computer.create()', {
			id: computerId,
			name: 'Anônimo',
			classroomName,
			timestamp: 1,
		});
		joinEnvironment(computerId);
		return computerId;
	};

	const joinEnvironment = (newComputerId: string) => {
		setComputerId(newComputerId);
		connect().emit('classroom.environment.join()', {
			environmentId: newComputerId,
		});
	};

	const joinRoom = (classroomName: string) => {
		setClassroomName(classroomName);
		if (classroomName === '') {
			clear();
			return;
		}
		connect().emit('classroom.join()', {
			name: classroomName,
		});
	};

	const changeEnvironment = (environment: Environment) => {
		setEnvironment(environment);
		connect().emit('classroom.environment.change()', {
			environment,
			computerId,
		});
	};

	const changeComputer = (computer: Computer) => {
		setComputer(computer);
		connect().emit('classroom.computer.change()', computer);
	};

	return (
		<ClassroomContext.Provider
			value={{
				createComputer,
				joinRoom,
				changeEnvironment,
				computers,
				classroomName,
				environment,
				computerId,
				setComputerId,
				joinEnvironment,
				setEnvironment,
				setLastUpdate,
				lastUpdate,
				computer,
				changeComputer,
			}}
		>
			{children}
		</ClassroomContext.Provider>
	);
}

export function useClassroom() {
	const context = useContext(ClassroomContext);
	return context;
}
