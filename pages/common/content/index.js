const trainingModules = require('./training-modules');

module.exports = {
  siteTitle: 'Research and testing using animals',
  beta: 'This is a new service - your [feedback](mailto:aspeltechnicalqueries@homeoffice.gov.uk) will help us to improve it.',
  breadcrumbs: {
    dashboard: 'Home',
    invitation: 'Accept invitation',
    establishment: {
      list: 'Establishments',
      dashboard: '{{establishment.name}}',
      read: 'Details',
      update: 'Amend establishment details',
      apply: 'Apply for licence',
      fees: 'Estimated licence fees',
      rops: 'Returns of procedures',
      suspend: 'Suspend establishment licence',
      reinstate: 'Reinstate establishment licence'
    },
    pil: {
      read: 'View personal licence',
      create: 'Apply for personal licence',
      update: {
        root: 'Personal licence',
        training: 'Training',
        exemptions: 'Exemptions',
        procedures: 'Procedures',
        species: 'Animal types',
        establishment: 'Establishment'
      },
      revoke: 'Revoke personal licence',
      suspend: 'Suspend personal licence',
      reinstate: 'Reinstate personal licence'
    },
    globalProfile: 'Profile',
    pils: {
      list: 'Personal licences',
      courses: {
        list: 'Training courses',
        create: 'New training course',
        read: '{{trainingCourse.title}}',
        update: 'Update',
        participants: {
          add: 'Apply for licence',
          read: 'View licence',
          revoke: 'Revoke licence'
        }
      }
    },
    place: {
      read: '{{place.name}}',
      list: 'Approved areas',
      create: 'Create approved area',
      update: 'Amend approved area',
      delete: 'Remove approved area'
    },
    profile: {
      list: 'People',
      read: '{{profile.firstName}} {{profile.lastName}}',
      invite: 'Invite user',
      invitations: 'Invitations',
      permission: 'Change / remove permissions',
      convertLegacyProject: 'Convert legacy project',
      remove: 'Remove permissions'
    },
    role: {
      create: 'Add role',
      delete: 'Remove role',
      confirm: 'Confirm',
      success: 'Success',
      namedPersonMvp: {
        beforeYouApply: 'Add role'
      }
    },
    project: {
      list: 'Projects',
      read: '{{project.title}}',
      updateLicenceHolder: 'Update licence holder',
      upload: 'Upload draft application',
      revoke: 'Revoke licence',
      suspend: 'Suspend project licence',
      reinstate: 'Reinstate project licence',
      import: 'Import project',
      addUser: 'Give access to this PPL',
      transferDraft: 'Transfer draft project'
    },
    projectVersion: {
      read: 'View',
      update: 'Amend licence',
      'update-draft': 'Edit draft',
      downloads: 'Downloads',
      convert: 'Convert legacy licence',
      nts: 'Non-technical summary'
    },
    rops: 'Return of procedures {{year}}',
    ropsReporting: 'Return of procedures {{year}}',
    account: {
      menu: 'Your account',
      update: 'Edit your details',
      updateEmail: 'Change your email address',
      updatePassword: 'Change your password',
      emailPreferences: 'Email alerts'
    },
    feedback: 'Feedback',
    task: {
      list: 'Tasklist',
      read: {
        root: 'View task',
        extend: 'Extend deadline',
        removeDeadline: 'Remove deadline',
        reinstateDeadline: 'Reinstate deadline',
        confirm: 'Confirm',
        confirmRefuse: 'Confirm',
        review: 'Review',
        success: 'Success',
        deadlinePassed: 'Deadline passed reason',
        uploadHba: 'Upload harm benefit analysis file',
        confirmHba: 'Confirm harm benefit analysis file'
      }
    },
    training: {
      dashboard: 'Training',
      type: 'Type',
      certificate: 'Certificate',
      modules: 'Modules',
      species: 'Species'
    }
  },
  pages: {
    account: {
      title: 'Your account',
      update: 'Edit your details',
      updateEmail: {
        base: 'Change your email address',
        confirm: 'Confirm changes'
      },
      updatePassword: {
        base: 'Change your password'
      }
    },
    dashboard: {
      greeting: 'Hello {{name}}',
      invite: 'Invite',
      tasks: 'Tasks'
    },
    establishment: {
      list: 'Establishments',
      read: 'Establishment details',
      edit: 'Amend establishment details',
      confirm: 'Confirm changes',
      fees: {
        overview: 'Licence fees'
      },
      rops: 'Returns of procedures'
    },
    profile: {
      list: 'People',
      invite: 'Invite user',
      invitations: 'Invitations',
      permission: {
        change: 'Change / remove'
      },
      links: {
        back: 'Back to profile'
      }
    },
    project: {
      list: 'Projects',
      read: 'Project'
    },
    place: {
      list: 'Approved areas',
      edit: 'Amend approved area',
      confirm: 'Confirm changes'
    },
    pil: {
      categories: 'Choose personal licence (PIL) category',
      dashboard: 'Apply for categories A, B, C, D and F PIL',
      categoryAToF: 'Categories A,B,C,D and F',
      categoryE: 'Category E'
    },
    pils: 'Personal licences',
    edit: 'Edit'
  },
  licenceNumber: 'Licence number',
  establishmentLicenceNumber: 'Establishment licence number',
  establishmentCorporateStatus: 'Establishment licence type',
  personalLicenceNumber: 'Personal licence number',
  licenceHolder: 'Licence holder',
  pelh: 'Establishment licence holder',
  nprc: 'Named Person Responsible for Compliance (NPRC)',
  holc: 'Home Office Liaison Contact (HOLC)',
  inspectors: 'Inspectors',
  spoc: 'Single Point of Contact (SPoC)',
  sharedKey: 'Establishment SharedKey',
  establishment: 'Establishment',
  buttons: {
    submit: 'Submit',
    edit: 'Edit',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  fields: {
    declaration: {
      label:
        'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
    }
  },
  errors: {
    heading: 'There is a problem',
    headingPlural: 'There is a problem',
    form: {
      unchanged: 'No changes have been made',
      csrf: 'This form data has been changed somewhere else.'
    },
    declaration: {
      required: 'Select to confirm that you understand.'
    },
    default: {
      maxLength: 'This field is limited to 256 characters',
      required: 'This field is required'
    }
  },
  countdown: {
    singular: '1 {{unit}} left',
    plural: '{{diff}} {{unit}}s left',
    expired: 'Expired',
    expiresToday: 'Expires today'
  },
  success: {
    whatNext: {
      title: 'What happens next'
    }
  },
  notifications: {
    success: 'Changes saved.',
    'form-session-error':
      'There was a problem processing this form. Please try again.'
  },
  warnings: {
    openTask: 'This item is currently being edited'
  },
  invalidLicence: {
    status: {
      draft: 'Draft',
      inactive: 'Draft',
      pending: 'Draft',
      revoked: 'Revoked',
      refused: 'Refused',
      expired: 'Expired',
      suspended: 'Suspended',
      establishmentSuspended: 'Related establishment licence suspended',
      active: 'Amendment in progress',
      superseded: 'Superseded',
      stub: 'Partial record',
      transferred: 'Transferred out',
      'additional-availability-removed': 'Additional availability removed'
    },
    summary: {
      pel: `This licence is not active. The establishment is not authorised to apply regulated procedures to protected animals, or to breed, supply, or keep protected animals in any approved area.`,
      pil: `This licence is not active. The licence holder or applicant is not authorised to carry out regulated procedures in the categories stated in this licence/application.`,
      ppl: `This licence is not active. The licence holder or applicant is not authorised to carry out the programme of work as stated in this licence/application.`,
      ppl_active: `This amendment has not been approved yet.`,
      superseded:
        'This licence is not active. The licence holder or applicant is not authorised to carry out the programme of work as stated in this licence/application.',
      stub: 'This is not the full granted licence for this project, it is a partial record. To view the granted licence, refer to offline records or contact the Home Office.',
      transferred:
        'This licence has been transferred to another establishment.',
      'additional-availability-removed':
        'This is the most recent version of the licence that {{establishmentName}} is authorised to see.',
      establishmentSuspended: `{{establishmentName}}'s establishment licence is not active. The establishment is not
authorised to apply regulated procedures to protected animals, or to breed, supply, or keep protected animals
in any area at the establishment.`
    },
    view: 'View granted licence',
    viewTransferred: 'View the latest version of this licence'
  },
  updateInProgress: 'There is a pending change request to these conditions.',
  'view-task': 'View task',
  openTask: {
    application: {
      title: 'Application in progress',
      description:
        'An application has been submitted and is being reviewed. You can view or recall the application.'
    },
    amendment: {
      title: 'Amendment in progress',
      description:
        'An amendment to this licence has been submitted and is being reviewed. You can view or recall the amendment.'
    },
    revocation: {
      title: 'Revocation in progress',
      description:
        'A request to revoke this licence has been submitted and is being reviewed. You can view or recall the revocation.'
    },
    transfer: {
      title: 'Transfer in progress',
      description:
        'A request to transfer this licence to another establishment has been submitted and is being reviewed. You can view or recall the licence transfer.'
    },
    review: {
      title: 'Review in progress',
      description:
        'A request to review this licence has been submitted and is being reviewed. You can view or recall the review request.'
    }
  },
  relatedTasks: {
    unavailable: 'Related tasks unavailable',
    noTasks: 'There are no related tasks.'
  },
  trainingModules,
  enforcementBanner: {
    subject: {
      open: 'This subject is related to ongoing enforcement case {{number}}',
      closed:
        'This subject is related to a confirmed non-compliance under case {{number}}'
    },
    profile: {
      open: 'This person is subject to ongoing enforcement activity under case {{number}}',
      closed:
        'This person is related to a confirmed non-compliance under case {{number}}'
    },
    pil: {
      open: 'This personal licence is subject to ongoing enforcement activity under case {{number}}',
      closed:
        'This personal licence is related to a confirmed non-compliance under case {{number}}'
    },
    project: {
      open: 'This project licence is subject to ongoing enforcement activity under case {{number}}',
      closed:
        'This project licence is related to a confirmed non-compliance under case {{number}}'
    },
    establishment: {
      open: 'This establishment is subject to ongoing enforcement activity under case {{number}}',
      closed:
        'This establishment is related to a confirmed non-compliance under case {{number}}'
    },
    details: {
      open: 'This establishment is subject to ongoing enforcement activity under case {{number}}',
      closed:
        'This establishment is related to a confirmed non-compliance under case {{number}}'
    },
    places: {
      open: `This establishment's approved areas are subject to ongoing enforcement activity under case {{number}}`,
      closed: `This establishment's approved areas are related to a confirmed non-compliance under case {{number}}`
    },
    roles: {
      open: `This establishment's named people are subject to ongoing enforcement activity under case {{number}}`,
      closed: `This establishment's named people are related to a confirmed non-compliance under case {{number}}`
    },
    moreInfo:
      'For more information speak to the compliance assurance team at [ASRUEnforcement@homeoffice.gov.uk](mailto:ASRUEnforcement@homeoffice.gov.uk)',
    caseDetails: 'Case details',
    flagExpires: 'Enforcement flag in place until:',
    remedialAction: {
      applied: 'Remedial action applied:',
      actions: {
        'inspector-advice': 'Inspector advice',
        'letter-of-reprimand': 'Letter of reprimand',
        'reprimand-retraining': 'Letter of reprimand and retraining',
        'compliance-notice': 'Compliance notice',
        'suspension-retraining': 'Suspension and retraining',
        'licence-revocation': 'Revocation of licence',
        other: 'Other'
      }
    }
  },
  corporateStatus: {
    corporate: 'Corporate PEL',
    'non-profit': 'Individual PEL'
  }
};
