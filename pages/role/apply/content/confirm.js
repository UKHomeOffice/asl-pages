const { merge } = require('lodash');
const baseContent = require('../../../profile/content');

module.exports = merge({}, baseContent, {
  reviewRoleApplication: 'Assign named role',
  applyingFor: 'You are assigning the role of:',
  onBehalfOf: 'To:',
  rcvsNumber: 'RCVS number:',
  explanation: 'Why is this person suitable for this named role?',
  buttons: {
    submit: 'Submit'
  }
});
