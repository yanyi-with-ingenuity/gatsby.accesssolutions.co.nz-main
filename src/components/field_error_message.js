import React from 'react';

const FieldErrorMessage = (props) => {
    return (
        <div
            className={props.className}>
            {props.errorMessages}
        </div>
    );
}

export default FieldErrorMessage;
