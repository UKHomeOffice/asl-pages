const moment = require('moment');

module.exports = {
  firstName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  lastName: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      { dateIsBefore: moment() }
    ]
  },
  telephone: {
    inputType: 'inputText'
  },
  comments: {
    inputType: 'textarea'
  }
};
