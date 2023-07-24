import React from 'react';
import './style.css';

const useFormValidation = ({ initialValue, validations }) => {
  const [formValue, onChangeHandler] = React.useState(initialValue);
  const [errors, setErrors] = React.useState({});
  const runValidations = () => {
    Object.keys(validations).forEach((key) => {
      if (validations[key].required && !formValue[key]) {
        // const localError = { ...errors };
        if (!errors[key]) {
          errors[key] = {};
        }
        errors[key].required = 'field is required';
      }
      setErrors({ ...errors });
      console.log(key, 'key', formValue[key], errors, 'eorrr');
    });
  };
  const handleChange = (e) => {
    // console.log(name,'value',value)
    onChangeHandler({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    runValidations();
  };
  return [formValue, handleChange, errors];
  // value.initialValue.email;
};

const LoginForm = () => {
  // formik.values
  // formik.onChange
  const [formValue, handleChange, errors] = useFormValidation({
    initialValue: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validations: {
      email: {
        required: true,
        minLength: 5,
        maxLength: 100,
      },
      phone: {
        required: true,
        minLength: 8,
        maxLength: 18,
      },
      password: {
        required: true,
        minLength: 8,
        maxLength: 18,
      },
      confirmPassword: {
        required: true,
        minLength: 8,
        maxLength: 18,
        match: 'password',
      },
    },
  });
  console.log(errors, 'eorrrr');
  return (
    <>
      <div>
        <input
          onChange={handleChange}
          name="email"
          value={formValue.email}
          type="email"
          placeholder="email"
        />
        {errors.email && <span> error found in email</span>}
      </div>
      <div>
        <input
          onChange={handleChange}
          value={formValue.phone}
          name="phone"
          type="phone"
          placeholder="phone"
        />
        {errors.phone && <span> error found in phone</span>}
      </div>
      <div>
        <input
          onChange={handleChange}
          value={formValue.password}
          type="password"
          name="password"
          placeholder="password"
        />
        {errors.password && <span> error found in password</span>}
      </div>
      <div>
        <input
          onChange={handleChange}
          value={formValue.confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
        />
        {errors.confirmPassword && <span> error found in confirmPassword</span>}
      </div>
    </>
  );
};

export default function App() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
