module.exports = {
  title: 'NACWO mandatory training',
  nacwoMandatoryTrainingDesc: `\
Nominees must have completed all the mandatory training in the last 5 years before starting the role, unless:

* there is an unavoidable delay, in which case they must complete any missing modules as soon as possible
* they have grounds for an exemption - which means they have equivalent training or professional experience which makes the training unnecessary`,
  fields: {
    mandatory: {
      label: `Has {{profile.firstName}} completed all the mandatory training?`
    },
    other: {
      // title: 'Or select each that applies:'
    }
  },
  buttons: {
    submit: 'Save and continue',
    cancel: 'Cancel'
  },
  errors: {
    type: {
      required: `Tell us if {{profile.firstName}}'s training record is accurate and up to date`
    }
  }
};
