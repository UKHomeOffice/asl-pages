module.exports = {
  fields: {
    title: {
      label: 'Project title'
    },
    status: {
      label: 'Status'
    },
    licenceHolder: {
      label: 'PPL holder'
    },
    licenceNumber: {
      label: 'PPL number'
    },
    issueDate: {
      label: 'Date granted'
    },
    amendedDate: {
      label: 'Last amended'
    },
    expiryDate: {
      label: 'Expiry date'
    },
    revocationDate: {
      label: 'Date revoked'
    },
    raDate: {
      label: 'Retrospective assessment due'
    },
    transferredInDate: {
      label: 'Transferred in'
    },
    transferredOutDate: {
      label: 'Transferred out'
    },
    submittedAt: {
      label: 'Submitted to ASRU'
    },
    updatedAt: {
      label: 'Last updated'
    },
    granted: {
      label: 'Licence details',
      expired: 'View expired licence',
      view: 'View granted licence'
    },
    draft: {
      label: 'Current draft',
      view: 'Open draft'
    },
    submitted: {
      label: 'Submitted',
      view: 'View submitted application'
    },
    duration: {
      label: 'Project duration'
    }
  },
  'ra-required': 'Requires RA',
  status: {
    active: 'Active',
    'inactive-statuses': 'Inactive',
    inactive: 'Draft',
    transferred: 'Transferred',
    expired: 'Expired',
    revoked: 'Revoked'
  },
  tabs: {
    inactive: 'Drafts'
  },
  collaborators: {
    title: 'Colleagues granted access',
    fields: {
      name: 'Name',
      email: 'Email',
      action: ''
    },
    action: 'Remove access'
  }
};
