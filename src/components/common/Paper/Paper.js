import React from 'react';
import './Paper.scss';
import cx from 'classnames';

const Paper = ({ children, ...rest }) => {
	const className = cx('paper', { ...rest });

	return <div className={className}>{children}</div>;
};

export default Paper;
