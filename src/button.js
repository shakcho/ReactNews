import React from 'react';

const Button = ({onClick, className='btn btn-default', children}) => {
	return (
		<button
			onClick={onClick}
			className={className}
			type="button"
			>
		{children}
		</button>
	);
}
export default Button;