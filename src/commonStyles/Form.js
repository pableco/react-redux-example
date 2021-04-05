import React from 'react';
import PropTypes from 'prop-types';

import { InputTextStyles } from './Form.styles';

const Field = ({
    name,
    type = 'text',
    label,
    placeholder,
    onChange = () => {},
    defaultValue,
    inputRef,
    ...props
}) => (
    <InputTextStyles>
        { label && <label from={name}>
            {label}
        </label> }
        <div>
            <input
                name={name}
                ref={inputRef}
                type={type}
                onChange={onChange}
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...props}
            />
        </div>
    </InputTextStyles>
);

export default Field;
