import * as React from 'react';
import './buttonStyle.css';

interface Props {
    name?: string;
    type: string;
    classIcon?: string;
    className?: string;
    onClick?: any;
    title?: string;
    iconOnRight?: boolean;
}
export default ({name, type, onClick, className = '', classIcon = '', title, iconOnRight = false}: Props) => {
    return (
        <button className={`${className} ${'btn-custom'} ${type}`}
        onClick={onClick} title={title}>
            {classIcon && <i className={`${'button-icon'} ${classIcon}`}></i>}
            {name && <span className={iconOnRight ? 'icon-show-right' : ''}>{name}</span>}
        </button>
    );
};