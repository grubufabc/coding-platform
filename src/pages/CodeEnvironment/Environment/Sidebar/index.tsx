import React from 'react';
import { SidebarProvider } from './useSidebar';
import Tab from './Tabs/Tab';
import Tabs from './Tabs';
import Pane from './Panes/Pane';
import Panes from './Panes';

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children: children_data }) => {
	const children = Array.from(children_data as []) as React.ReactNode[];
	const [tabs, panes] = children;

	return (
		<SidebarProvider>
			<div
				style={{ minWidth: '4rem', transition: 'width 0.2s', overflow: 'auto' }}
			>
				<div className="d-flex h-100">
					<div style={{ width: '4rem' }}>{tabs}</div>
					<div
						style={{
							width: '100%',
							overflowX: 'hidden',
							height: '100%',
						}}
						className="d-flex flex-column"
					>
						{panes}
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
};

const Sidebar = { Container, Tabs, Tab, Panes, Pane };
export default Sidebar;
