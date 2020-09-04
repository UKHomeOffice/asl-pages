const { merge } = require('lodash');
const { NACWO, NVS, SQP } = require('@asl/dictionary');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  addNew: 'Create approved area',
  filters: {
    filterBy: 'Filter by',
    applyLabel: 'Apply filters',
    clearLabel: 'Clear filters'
  },
  buttons: {
    edit: 'Amend'
  },
  fields: {
    nacwos: {
      label: `<abbr title="${NACWO}">NACWOs</abbr>`
    },
    nvssqps: {
      label: `<abbr title="${NVS}">NVSs</abbr> / <abbr title="${SQP}">SQPs</abbr>`
    }
  }
});
