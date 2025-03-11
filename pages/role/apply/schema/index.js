const namedRoles = require('../../content/named-roles');
const hintText = require('../../content/hint-text');

const excludedRoles = {
  corporate: ['pelh'],
  'non-profit': ['nprc']
};

module.exports = (roles, establishment, hasNPFeatureFlag) => {
  const excludeRoles = (establishment.corporateStatus && excludedRoles[establishment.corporateStatus]) || [];

  // Remove PELH role if named person feature flag is enabled
  if (hasNPFeatureFlag) {
    excludeRoles.push('pelh');
  }

  roles = Object.keys(namedRoles)
    .filter(r => !roles.includes(r))
    .filter(r => !excludeRoles.includes(r));

  const options = roles.map(role => {
    return {
      value: role,
      label: namedRoles[role],
      hint: hintText[role],
      reveal: role === 'nvs'
        ? { rcvsNumber: { inputType: 'inputText' } }
        : null
    };
  });

  const schema = {
    type: {
      inputType: 'radioGroup',
      validate: [
        'required',
        {
          definedValues: roles
        }
      ],
      options,
      nullValue: []
    }
  };

  return {
    ...schema,
    ...(!hasNPFeatureFlag ? { comment: { inputType: 'textarea' } } : {})
  };
};
