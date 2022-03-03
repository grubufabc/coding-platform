import React from 'react';

interface SidebarProviderProps {
	children: React.ReactNode;
}

interface SidebarContextData {
	selectedPane: string;
	selectPane: (pane: string) => void;
}

const SidebarContext = React.createContext<SidebarContextData>(
	{} as SidebarContextData
);

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
	const [selectedPane, setSelectPane] = React.useState<string>('');

	const selectPane = (pane: string) => {
		setSelectPane(pane === selectedPane ? '' : pane);
	};

	return (
		<SidebarContext.Provider value={{ selectedPane, selectPane }}>
			{children}
		</SidebarContext.Provider>
	);
};

const useSidebar = () => {
	const context = React.useContext(SidebarContext);
	return context;
};

export { SidebarProvider, useSidebar };
