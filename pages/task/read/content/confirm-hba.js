const { merge } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');

module.exports = merge({}, baseContent, {
  tasks,
  title: 'Confirm HBA file',

  fields: {
    establishment: {
      label: 'Establishment:'
    },
    currentEstablishment: {
      label: 'Current establishment:'
    },
    proposedEstablishment: {
      label: 'Proposed establishment:'
    },
    applicant: {
      label: 'Applicant:'
    },
    proposedApplicant: {
      label: 'Proposed PPL licence holder:'
    },
    pplHolder: {
      label: 'PPL holder:'
    },
    currentPPLLicenceHolder: {
      label: 'Current PPL licence holder:'
    },
    proposedPPLLicenceHolder: {
      label: 'Proposed PPL licence holder:'
    },
    hbaFilename: {
      label: 'Selected HBA file:',
      download: 'Download file'
    },
    confirmHba: {
      label: 'What do you want to do?',
      options: {
        yes: 'Confirm and continue to grant or amend licence',
        no: 'Discard selected file and choose another'
      }
    }
  },
  warning:
    'Once confirmed, this HBA file in ASPeL (not SharePoint) will be the single point of reference for this {{type}}, for future assessment and audit purposes.',
  errors: {
    confirmHba: {
      required: 'Select an option',
      definedValues: 'Select from one of the provided options'
    }
  }
});
