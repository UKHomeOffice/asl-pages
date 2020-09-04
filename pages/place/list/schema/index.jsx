import React from 'react';
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
    label: <span><Acronym>NACWO</Acronym>s</span>
  },
  nvssqps: {
    show: true,
    sortable: false,
    filter: true,
    label: <span><Acronym>NVS</Acronym>s / <Acronym>SQP</Acronym>s</span>
  },
  updatedAt: {}
};
