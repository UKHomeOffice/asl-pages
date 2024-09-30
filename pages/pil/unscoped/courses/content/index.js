const { merge } = require('lodash');
const baseContent = require('../../content');
const fields = require('./fields');

module.exports = merge({}, baseContent, {
  fields,
  errors: {
    title: {
      required: 'Enter a course title'
    },
    typeOfCourse: {
      required: 'Please select higher education or training'
    },
    startDate: {
      required: 'Enter the course start date',
      validDate: 'Enter a valid date',
      dateIsAfter: 'Course start date must be in the future.'
    },
    species: {
      required: 'Please select at least one animal type.'
    },
    projectId: {
      required: 'Enter the licence number of the training project.'
    }
  },
  buttons: {
    cancel: 'Edit'
  }
});
