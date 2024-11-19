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
    inputType: 'inputText'
  },
  qualificationLevelAndSubject: {
    inputType: 'inputText'
  },
  applicantLearningUse: {
    inputType: 'textAreaWithWordCount',
    validate: [
      { lessThanOrEqualToMaxWordCount: 250 }
    ]
  },
  jobTitleOrQualification: {
    inputType: 'inputText'
  },
  fieldOfExpertise: {
    inputType: 'inputText'
  },
  applicantTrainingUseAtWork: {
    inputType: 'textAreaWithWordCount',
    validate: [
      { lessThanOrEqualToMaxWordCount: 250 }
    ]
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
