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
  email: {
    inputType: 'inputText',
    validate: [
      'required',
      {
        customValidate: email => /^\S+@\S+$/.test(email)
      }
    ]
  },
  dob: {
    inputType: 'inputDate',
    validate: [
      'required',
      { dateIsBefore: 'now' }
    ]
  },
  organisation: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  qualificationLevelAndSubject: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  applicantLearning: {
    inputType: 'textarea',
    validate: [
      'required'
    ]
  },
  otherRoles: {
    inputType: 'textarea'
  }
};
