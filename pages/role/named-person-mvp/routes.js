const beforeYouApply = require('./before-you-apply');
const create = require('./apply');
const mandatroyTraining = require('./mandatory-training');

module.exports = {
  beforeYouApply: {
    path: '/before-you-apply',
    router: beforeYouApply,
    breadcrumb: false
  },
  create: {
    path: '/create',
    router: create,
    breadcrumb: false
  },
  mandatoryTraining: {
    path: '/mandatroy-training',
    router: mandatroyTraining,
    breadcrumb: false
  }
};
