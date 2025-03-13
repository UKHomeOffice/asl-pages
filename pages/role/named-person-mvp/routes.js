const beforeYouApply = require('./before-you-apply');
const create = require('./apply');
const nacwo = require('./nacwo');

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
  nacwo: {
    path: '/nacwo',
    router: nacwo,
    breadcrumb: false
  }
};
