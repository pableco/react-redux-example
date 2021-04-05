import React from 'react';
import PropTypes from 'prop-types';

import { InputTextStyles } from './FormField.styles';

const Field = ({
    name,
    type,
    label,
    placeholder,
    onChange,
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


Field.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

Field.defaultProps = {
    type: 'text',
    onChange: () => {},
};


export default Field;
