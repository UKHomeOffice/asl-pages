const moment = require('moment');

module.exports = {
  first_name: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  last_name: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      'validDate',
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
