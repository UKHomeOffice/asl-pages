module.exports = {
  projectTitle: {
    accessor: 'project.title'
  },
  coursePurpose: {
    inputType: 'radioGroup',
    options: [{
      value: 'Higher education',
      label: 'Higher education',
      hint: 'For example a degree in pharmacology or physiology'
    }, {
      value: 'Training',
      label: 'Training',
      hint: 'For example to learn a new surgical procedure'
    }],
    validate: ['required']
  },
  title: {
    inputType: 'inputText',
    show: true,
    validate: [
      'required'
    ]
  },
  startDate: {
    inputType: 'inputDate',
    show: true,
    validate: [
      'required',
      'validDate',
      { dateIsAfter: 'now' }
    ]
  },
  species: {
    inputType: 'speciesSelector',
    format: JSON.parse,
    validate: [
      'required'
    ]
  },
  establishment: {
    accessor: 'establishment.name'
  },
  projectId: {
    inputType: 'autoComplete',
    accessor: 'project.id',
    options: [],
    apiPath: 'pils.courses.autocomplete-projects',
    formatNullValue: true,
    validate: [
      'required'
    ]
  }
};
