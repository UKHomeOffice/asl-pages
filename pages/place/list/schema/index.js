const { NACWO, NVS, SQP } = require('@asl/dictionary');

module.exports = {
  id: {},
  name: {
    show: true
  },
  site: {
    show: true,
    filter: true
  },
  area: {
    show: true
  },
  suitability: {
    show: true,
    filter: true,
    comparator: 'AND',
    exact: true
  },
  holding: {
    show: true,
    filter: true,
    comparator: 'AND',
    exact: true
  },
  nacwos: {
    show: true,
    sortable: false,
    filter: true,
    label: `<abbr title="${NACWO}">NACWOs</abbr>`
  },
  nvssqps: {
    show: true,
    sortable: false,
    filter: true,
    label: `<abbr title="${NVS}">NVSs</abbr> / <abbr title="${SQP}">SQPs</abbr>`
  },
  updatedAt: {}
};
