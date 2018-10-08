const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PERMISSION_LEVELS = ['admin', 'read', 'basic'];

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
  email: {
    inputType: 'inputEmail',
    validate: [
      'required',
      {
        match: EMAIL_REGEX
      }
    ]
  },
  role: {
    inputType: 'radioGroup',
    validate: [
      'required',
      {
        definedValues: PERMISSION_LEVELS
      }
    ],
    options: PERMISSION_LEVELS
  }
};
