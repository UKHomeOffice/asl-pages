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
  jobTitle: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  fieldOfExpertise: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  applicantTrainingUse: {
    inputType: 'textarea'
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
