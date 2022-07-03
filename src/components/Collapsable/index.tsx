import React from 'react';

declare var bootstrap: any;

interface CollapsableProps {
	label: React.ReactElement;
}

const Collapsable: React.FC<CollapsableProps> = ({ label, children }) => {
	const elementRef = React.useRef(null);

	const handleOpenClose = () => {
		const element = elementRef.current;
		if (!element) return;
		new bootstrap.Collapse(element);
	};

	return (
		<div className="border border-1 p-3 rounded rounded-3 mb-4">
			<div className="d-grid">
				<button className="btn px-0" onClick={handleOpenClose}>
					<h5 className="d-flex justify-content-between p-0 m-0">
						{label.props.children}
					</h5>
				</button>
			</div>
			<div className="collapse mt-4" ref={elementRef}>
				{children}
			</div>
		</div>
	);
};

export default Collapsable;
