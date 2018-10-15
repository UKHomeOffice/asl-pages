const { moduleCodes } = require('@asl/constants');
const { toArray } = require('../../../../lib/utils');
const content = require('../content');

const options = moduleCodes.map(m => {
  return {
    label: m,
    value: m,
    reveal: {
      reason: {
        inputType: 'textarea',
        validate: [{
          customValidate: (field, model) => {
            if (model.modules.includes(m)) {
              return !!field;
            }
            return true;
          }
        }],
        label: content.fields.reason.label
      }
    }
  };
});

module.exports = {
  modules: {
    inputType: 'checkboxGroup',
    options,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: moduleCodes
      }
    ]
  }
};
