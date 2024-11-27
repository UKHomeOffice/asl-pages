module.exports = {
  title: 'Enter participant details',
  description:
    'You are applying for a PIL-E on behalf of this participant. A PIL-E is a personal licence for higher education and training courses.',
  fields: {
    firstName: {
      label: 'First name'
    },
    lastName: {
      label: 'Last name'
    },
    email: {
      label: 'Email address'
    },
    dob: {
      label: 'Date of birth',
      hint: 'For example, 12 11 1980'
    },
    organisation: {
      label: 'Organisation'
    },
    qualificationLevelAndSubject: {
      label: 'Qualification level and subject',
      hint: 'For example BSc Pharmacology'
    },
    applicantLearningUse: {
      label:
        'How will the applicant use this learning in future scientific work using living animals?',
      checkAnswerLabel: 'Higher education or training outcomes',
      hint: 'Explain how they intend to use it to design, conduct or analyse research.'
    },
    jobTitleOrQualification: {
      label: 'Job title, career stage or qualification',
      hint: 'For example trainee doctor, consultant or registrar'
    },
    fieldOfExpertise: {
      label: 'Field of expertise',
      hint: 'For example head and neck surgeon'
    },
    applicantTrainingUseAtWork: {
      label: 'How will the applicant use this training in their work?',
      checkAnswerLabel: 'Higher education or training outcomes'
    },
    otherNotes: {
      label: 'Other notes (optional)'
    }
  },
  errors: {
    firstName: {
      required: 'Enter the first name of the participant.'
    },
    lastName: {
      required: 'Enter the last name of the participant.'
    },
    email: {
      required: 'Enter the email address of the participant.',
      customValidate: 'Enter a valid email address.'
    },
    dob: {
      required: 'Enter the date of birth of the participant.',
      dateIsBefore: 'Date of birth must be in the past.'
    },
    trainingNeed: {
      required: 'This is a required field.'
    },
    organisation: {
      required: 'Enter the organisation of the participant.'
    },
    qualificationLevelAndSubject: {
      required: 'Enter the qualification level and subject of the participant.'
    },
    applicantTrainingUseAtWork: {
      lessThanOrEqualToMaxWordCount:
        'How the applicant will use this training must be 100 characters or less',
      required: 'Enter how the applicant will use this training in their work.'
    },
    applicantLearningUse: {
      lessThanOrEqualToMaxWordCount:
        'How the applicant will use this learning must be 250 characters or less',
      required:
        'Enter how the applicant will use this learning in future scientific work using living animals.'
    },
    jobTitleOrQualification: {
      required:
        'Enter the job title, career stage or qualification of the participant.'
    },
    fieldOfExpertise: {
      required: 'Enter the field of expertise of the participant.'
    }
  },
  buttons: {
    submit: 'Continue',
    cancel: 'Cancel'
  }
};
