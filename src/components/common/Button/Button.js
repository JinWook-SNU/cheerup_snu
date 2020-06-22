import React from 'react';
import './Button.scss';
import cx from 'classnames';

const Button = ({ children, full, marginTop, ...rest }) => {
	const className = cx('button', { full, marginTop });

	return (
		<button className={className} {...rest}>
			{children}
		</button>
	);
};

export default Button;
