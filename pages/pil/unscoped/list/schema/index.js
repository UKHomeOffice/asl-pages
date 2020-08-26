module.exports = {
  id: {},
  profile: {
    show: true,
    sort: 'profile.lastName'
  },
  licenceNumber: {
    accessor: 'profile.pilLicenceNumber',
    show: true
  },
  issueDate: {
    show: true
  },
  reviewDate: {
    show: true
  },
  reviewStatus: {
    show: true,
    sortable: false
  }
};
