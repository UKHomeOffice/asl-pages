const dictionary = require('@asl/dictionary');

const roles = [
  'holc',
  'nacwo',
  'nio',
  'nvs',
  'sqp',
  'ntco',
  'nprc'
];

module.exports = roles.reduce((map, role) => {
  return {
    ...map,
    [role]: `${dictionary[role.toUpperCase()]} (${role.toUpperCase()})`
  };
}, {
  pelh: 'Establishment Licence Holder'
});
