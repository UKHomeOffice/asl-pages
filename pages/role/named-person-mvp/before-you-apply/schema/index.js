const { toBoolean } = require('../../../../../lib/utils');

module.exports = (req) => {

  //get nominee from request
  const nominee = 'test';

  return {
    type: {
      inputType: 'radioGroup',
      format: toBoolean,
      options: [
        {
          label: `Yes, I am ready to nominate ${nominee} for a role`,
          value: true
        },
        {
          label: `No, I need to view or update ${nominee}'s traning record`,
          value: false
        }
      ],
      validate: ['required']
    }
  };
};
