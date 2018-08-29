const { isUndefined, isNull, every } = require('lodash');
const moment = require('moment');

const validators = {
  type: (field, type) => {
    if (isUndefined(field) || isNull(field)) {
      return true;
    }
    switch (type) {
      case 'array':
        return Array.isArray(field);
      case 'object':
        return !Array.isArray(field) && typeof field === 'object';
      case 'number':
        return typeof field === 'number';
      case 'string':
        return typeof field === 'string';
    }
    return false;
  },
  required: field => {
    if (Array.isArray(field)) {
      return !!field.length;
    }
    return field !== null && field !== '' && !isUndefined(field);
  },
  minLength: (field, length) => {
    return isNull(field) ||
      (!isUndefined(field) && field.length >= length);
  },
  maxLength: (field, length) => {
    return isNull(field) ||
      (!isUndefined(field) && field.length <= length);
  },
  match: (field, regex) => {
    return !!(field.match && field.match(regex));
  },
  matchesField: (field, matchField, model) => {
    return field === model[matchField];
  },
  definedValues: (field, definedValues) => {
    if (Array.isArray(field)) {
      return every(field, val => definedValues.includes(val));
    }
    return definedValues.includes(field);
  },
  validDate: date => {
    return isNull(date) || moment(date).isValid();
  },
  dateIsBefore(date, isBefore) {
    return isNull(date) || moment(date).isBefore(isBefore);
  },
  dateIsAfter(date, isAfter) {
    return isNull(date) || moment(date).isAfter(isAfter);
  }
};

module.exports = validators;
