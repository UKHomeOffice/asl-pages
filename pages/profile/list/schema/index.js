module.exports = {
  id: {
    filter: false
  },
  name: {
    show: true,
    filter: false,
    sort: 'last_name'
  },
  first_name: {},
  last_name: {},
  roles: {
    show: true,
    exact: true,
    accessor: 'roles.type',
    f: 'type'
  },
  pil: {
    show: true,
    accessor: 'pil.licence_number'
  }
};
