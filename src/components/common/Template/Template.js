import React from 'react';
import './Template.scss';
import cx from 'classnames';

const Template = ({ children, ...rest }) => {
	const className = cx('template', { ...rest });

	return <div className={className}>{children}</div>;
};

export default Template;
