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
	changeComputerName: (computerName: string) => void;
	changeEnvironment: (environment: Environment) => void;
	computerName: string;
	classroomName: string;
	setComputerName: (computerName: string) => void;
	environment: Environment;
	computerId: string;
	setComputerId: (computerId: string) => void;
	joinEnvironment: (computerId: string) => void;
	setEnvironment: (environment: Environment) => void;
	setLastUpdate: (lastUpdate: number) => void;
	lastUpdate: number;
}

const ClassroomContext = createContext<ClassroomContextData>(
	{} as ClassroomContextData
);

export function ClassroomProvider({ children }: ClassroomProviderProps) {
	const [computerName, setComputerName] = useState('');
	const [computerId, setComputerId] = useState('');
	const [classroomName, setClassroomName] = useState('');
	const [lastUpdate, setLastUpdate] = React.useState(new Date().getTime());
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleEvents = {
		'classroom.updated': (newComputers: Computer[]) => {
			setComputers(newComputers);
			setComputerName(
				newComputers.find((computer) => computer.id === getComputerId())
					?.name || ''
			);
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
		connect().emit('classroom.join()', {
			name: classroomName,
		});
	};

	const changeComputerName = (newComputerName: string) => {
		setComputerName(newComputerName);
		connect().emit('classroom.computer.name.change()', {
			classroomName,
			name: newComputerName,
			id: computerId,
		});
	};

	const changeEnvironment = (environment: Environment) => {
		setEnvironment(environment);
		connect().emit('classroom.environment.change()', {
			environment,
			computerId,
		});
	};

	return (
		<ClassroomContext.Provider
			value={{
				createComputer,
				joinRoom,
				changeComputerName,
				changeEnvironment,
				computers,
				computerName,
				classroomName,
				setComputerName,
				environment,
				computerId,
				setComputerId,
				joinEnvironment,
				setEnvironment,
				setLastUpdate,
				lastUpdate,
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
