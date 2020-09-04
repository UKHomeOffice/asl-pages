import React, { Fragment } from 'react';
import { Acronym } from '@asl/components';

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
    label: <Fragment><Acronym>NACWO</Acronym>s</Fragment>
  },
  nvssqps: {
    show: true,
    sortable: false,
    filter: true,
    label: <Fragment><Acronym>NVS</Acronym>s / <Acronym>SQP</Acronym>s</Fragment>
  },
  updatedAt: {}
};
