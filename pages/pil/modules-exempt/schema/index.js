const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');

module.exports = {
  modules: {
    inputType: 'checkboxGroup',
    options: moduleCodes,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: moduleCodes
      }
    ]
  },
  reason: {
    inputType: 'textarea',
    toggleReveal: true,
    validate: ['required']
  }
};
