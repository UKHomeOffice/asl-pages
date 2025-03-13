
module.exports = (profile) => {
  return {
    type: {
      additionalContent: `Select 'Yes' if they have completed all the mandatory training with in the last 5 years`,
      inputType: 'checkboxGroup',
      options: [
        {
          label: 'Yes',
          value: 'yes'
        },
        {
          label: 'They have requested an exemption from one or more modules',
          value: 'exemption'
        },
        {
          label: 'They is an unavoidable delay in completing one or more modules',
          value: 'delay'
        }
      ],
      validate: ['required']
    }
  };
};
