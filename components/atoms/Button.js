import React from 'react';

const Button = ({ type = 'button', children, disabled }) => {
    return (
        <button type={type} disabled={disabled} className="btn">
            {children}
        </button>
    );
};

export default Button;
