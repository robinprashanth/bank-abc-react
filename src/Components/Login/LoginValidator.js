import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'valid email is required';
  }
  if (!data.password) {
    errors.password = 'password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

