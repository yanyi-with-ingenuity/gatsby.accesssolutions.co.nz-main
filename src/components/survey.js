import React, { useState } from 'react'

import Validate from '../components/validation.js';
import FieldText from '../components/field_text.js';
import FieldEmail from '../components/field_email.js';
import FieldTextArea from '../components/field_textarea.js';
import FieldErrorMessage from '../components/field_error_message.js';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.GATSBY_PUBLIC_RECAPTCHA_SITE_KEY;
//console.log('✅ SITE_KEY:', SITE_KEY);

export default function Form() {
  const recaptchaRef = React.createRef();
  const [formValues, setFormValues] = useState({
    formErrors: '',
    formIsValid: false,
    formControls: {
      full_name: {
        type: 'text',
        value: '',
        placeholder: 'Your name',
        valid: false,
        touched: false,
        validationRules: {
          isRequired:  true
        },
        errorMessages: ''
      },
      email: {
        type: 'email',
        value: '',
        placeholder: 'Your email',
        valid: false,
        touched: false,
        validationRules: {
          isRequired:  true,
          isEmail: true
        },
        errorMessages: ''
      },
      phone: {
        type: 'text',
        value: '',
        placeholder: 'Your phone',
        valid: false,
        touched: false,
        validationRules: {
          isRequired:  true
        },
        errorMessages: ''
      },
      date: {
        type: 'date',
        value: '',
        placeholder: 'Date required on site',
        valid: false,
        touched: false,
        validationRules: {
            isRequired: true
        },
        errorMessages: ''
      },
      location: {
        type: 'text',
        value: '',
        placeholder: 'Your site location',
        valid: false,
        touched: false,
        validationRules: {
          isRequired:  true
        },
        errorMessages: ''
      },
      message: {
        type: 'text',
        value: '',
        placeholder: 'Your message',
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true
        },
        errorMessages: ''
      },
    }
  });

  const changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    const updatedControls = {
      ...formValues.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;

    let validateFormElement = [];
    validateFormElement = Validate(value, updatedFormElement.validationRules);

    updatedFormElement.valid = validateFormElement.isValid;
    updatedFormElement.errorMessages = validateFormElement.errorMessages;

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    setFormValues({
      ...formValues,
      formControls: updatedControls,
      formIsValid: formIsValid,
    });
  }

  const submitHandler = async e => {
    e.preventDefault();
    e.persist();

    let fieldData = new FormData()

    for (let formElementId in formValues.formControls) {
      fieldData.append(formElementId, formValues.formControls[formElementId].value)
    }

    const token = await recaptchaRef.current.executeAsync();
    //console.log('✅ token', token);

    fieldData.append('recaptcha', token)
    //console.log('✅ fieldData', fieldData);
    //console.log('✅ formValues', formValues);

    const res = await fetch('/api/survey', {
      method: 'POST',
      body: fieldData,
    });
    
    if (res.status === 200) {
      window.location.href = '/site-survey/thanks/';
      return
    }

    if (res.status === 422) {
      let errors = await res.json();
      setFormValues({
        ...formValues,
        formErrors: errors.message,
      });
      return
    };

    if (res.status === 404) {
      let errors = await res.json();
      setFormValues({
        ...formValues,
        formErrors: errors.message,
      });
      return
    };
  }
  return (
    <form className="form" name="survey" onSubmit={submitHandler}>
      <FieldText
        id="full_name"
        name="full_name"
        type={formValues.formControls.full_name.type}
        placeholder={formValues.formControls.full_name.placeholder}
        value={formValues.formControls.full_name.value}
        onChange={changeHandler}
        className={formValues.formControls.full_name.touched && !formValues.formControls.full_name.valid ? 'field__input error' : 'field__input'}
      />
      <FieldErrorMessage
        className={formValues.formControls.full_name.touched && !formValues.formControls.full_name.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.full_name.errorMessages}
      />
      <FieldEmail
        id="email"
        name="email"
        type={formValues.formControls.email.type}
        placeholder={formValues.formControls.email.placeholder}
        value={formValues.formControls.email.value}
        onChange={changeHandler}
        className={formValues.formControls.email.touched && !formValues.formControls.email.valid ? 'field__input error' : 'field__input'}
      />
      <FieldErrorMessage
        className={formValues.formControls.email.touched && !formValues.formControls.email.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.email.errorMessages}
      />
      <FieldText
        id="phone"
        name="phone"
        type={formValues.formControls.phone.type}
        placeholder={formValues.formControls.phone.placeholder}
        value={formValues.formControls.phone.value}
        onChange={changeHandler}
        className={formValues.formControls.phone.touched && !formValues.formControls.phone.valid ? 'field__input error' : 'field__input'}
      />
      <FieldErrorMessage
        className={formValues.formControls.phone.touched && !formValues.formControls.phone.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.phone.errorMessages}
      />
      <FieldText
        id="date"
        name="date"
        type={formValues.formControls.date.type}
        placeholder={formValues.formControls.date.placeholder}
        value={formValues.formControls.date.value}
        onChange={changeHandler}
        className={formValues.formControls.date.touched && !formValues.formControls.date.valid ? 'field__input error' : 'field__input'}
      />
      <FieldErrorMessage
        className={formValues.formControls.date.touched && !formValues.formControls.date.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.date.errorMessages}
      />
      <FieldText
        id="location"
        name="location"
        type={formValues.formControls.location.type}
        placeholder={formValues.formControls.location.placeholder}
        value={formValues.formControls.location.value}
        onChange={changeHandler}
        className={formValues.formControls.location.touched && !formValues.formControls.location.valid ? 'field__input error' : 'field__input'}
      />
      <FieldErrorMessage
        className={formValues.formControls.location.touched && !formValues.formControls.location.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.location.errorMessages}
      />
      <FieldTextArea
        id="message"
        name="message"
        type={formValues.formControls.message.type}
        placeholder={formValues.formControls.message.placeholder}
        value={formValues.formControls.message.value}
        onChange={changeHandler}
        className={formValues.formControls.message.touched && !formValues.formControls.message.valid ? 'field__textarea error' : 'field__textarea'}
      />
      <FieldErrorMessage
        className={formValues.formControls.message.touched && !formValues.formControls.message.valid ? 'show field__errors' : 'hide field__errors'}
        errorMessages={formValues.formControls.message.errorMessages}
      />
      <ReCAPTCHA
        size="invisible"
        ref={recaptchaRef}
        sitekey={SITE_KEY}
      />
      <button 
        type="submit" 
        disabled={!formValues.formIsValid} 
        className="send">
          Send &rsaquo;
      </button>
    </form>
  );
}