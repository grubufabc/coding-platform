import { createContext, ReactNode, useContext, useState } from 'react';

interface Computer {
	id: string;
	name: string;
}

interface ClassroomProviderProps {
	children: ReactNode;
}

interface ClassroomContextData {}

const ClassroomContext = createContext<ClassroomContextData>(
	{} as ClassroomContextData
);

export function ClassroomProvider({ children }: ClassroomProviderProps) {
	const [classroomName, setClassroomName] = useState('');
	const [computers, setComputers] = useState<Computer[]>([]);

	return (
		<ClassroomContext.Provider value={{}}>{children}</ClassroomContext.Provider>
	);
}

export function useClassroom() {
	const context = useContext(ClassroomContext);
	return context;
}
