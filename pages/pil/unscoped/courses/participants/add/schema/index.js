const MAX_WORD_COUNT_250 = 250;
const MAX_WORD_COUNT_100 = 100;

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
    maxWordCount: MAX_WORD_COUNT_250,
    validate: [
      { lessThanOrEqualToMaxWordCount: MAX_WORD_COUNT_250 }
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
    maxWordCount: MAX_WORD_COUNT_100,
    validate: [
      { lessThanOrEqualToMaxWordCount: MAX_WORD_COUNT_100 }
    ]
  },
  otherNotes: {
    inputType: 'textarea'
  }
};
