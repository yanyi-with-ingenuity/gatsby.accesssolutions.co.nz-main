const validate = (value, rules) => {
    let isValid = true;
    let errorMessages = [];

    for (let rule in rules) {
        switch (rule) {
            case 'isRequired':
                isValid = isValid && requiredValidator(value);
                if(!isValid){
                    errorMessages.push('Required Field');
                }
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules[rule]);
                if(!isValid){
                    errorMessages.push('Minimum of ' + rules[rule] + ' characters');
                }
                break;
            case 'isEmail':
                isValid = isValid && emailValidator(value);
                if(!isValid){
                    errorMessages.push('Invalid email');
                }
                break;
            default:
                isValid = true;
                errorMessages = '';
        }
    }

    let validateFormElement = [];
    validateFormElement.isValid = isValid;
    validateFormElement.errorMessages = errorMessages[0];
    return validateFormElement;
}

/**
 *
 * @param value
 * @param minLength
 * @returns {boolean}
 */
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
const requiredValidator = value => {
    return value.trim() !== '';
}

/**
 *
 * @param value
 * @returns {boolean}
 */
const emailValidator = value => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export default validate;
