import React from 'react';
import './Input.scss';
import cx from 'classnames';

const Input = ({ full, placeholder, ...rest }) => {
	const className = cx('input', {
		full
	});

	return <input className={className} placeholder={placeholder} {...rest} />;
};

export default Input;
