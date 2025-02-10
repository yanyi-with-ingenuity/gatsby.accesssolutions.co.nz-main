import React from 'react';

const SelectInput = (props) => {
    return (
        <select 
            id={props.id}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            className={props.className}
        >
            {props.options.map( (option, i) => (
                <option key={i} value={option.value}>{option.displayValue}</option>
            ))}
        </select>
    );
}

export default SelectInput;