import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};
  if (!data.firstName || !validator.isAlpha(data.firstName)) {
    errors.firstName = 'valid first name is required.';
  }
  if (!data.lastName || !validator.isAlpha(data.lastName)) {
    errors.lastName = 'valid last name is required.';
  }
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'valid email is required.';
  }
  if (!data.password) {
    errors.password = 'password is required.';
  }
  if (data.password !== data.passwordcheck) {
    errors.passwordcheck = 'passwords don\'t match.';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

