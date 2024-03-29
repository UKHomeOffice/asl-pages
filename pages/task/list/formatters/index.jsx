import React, { Fragment } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { format, isBefore, differenceInCalendarDays, isSameDay } from 'date-fns';
import { dateFormat } from '../../../../constants';
import { Snippet, Link } from '@ukhomeoffice/asl-components';
import AssignTask from '../components/assign-task';

const good = ['resolved'];
const bad = ['rejected', 'withdrawn', 'discarded-by-applicant', 'refused'];

const DeadlineMessage = ({ deadline }) => {
  const today = new Date();
  const formattedDeadline = format(deadline, dateFormat.medium);

  if (isSameDay(deadline, today)) {
    return <span title={formattedDeadline}><Snippet>deadline.due</Snippet></span>;
  } else if (isBefore(deadline, today)) {
    return <span title={formattedDeadline}><Snippet>deadline.overdue</Snippet></span>;
  } else {
    return <span>{formattedDeadline}</span>;
  }
};

const Deadline = ({ task }) => {
  const activeDeadline = task.activeDeadline;

  if (!task.withASRU || !activeDeadline) {
    return <p className="govuk-hint"><Snippet>deadline.none</Snippet></p>;
  }

  const now = new Date();
  const statutoryDeadline = get(task, 'data.deadline');
  const isExtended = get(statutoryDeadline, 'isExtended', false);
  const statutoryDate = get(statutoryDeadline, isExtended ? 'extended' : 'standard');
  const overdue = isBefore(activeDeadline, now);
  const urgent = overdue || differenceInCalendarDays(activeDeadline, now) <= 9;

  return (
    <span className={classnames('notice', { urgent })}>
      <DeadlineMessage deadline={activeDeadline} />
      {
        activeDeadline === statutoryDate &&
        <Fragment><br/><span><Snippet>deadline.statutory</Snippet></span></Fragment>
      }
    </span>
  );
};

export default {
  updatedAt: {
    format: date => date ? format(date, dateFormat.medium) : '-'
  },
  establishment: {
    format: (establishment) => establishment || '-'
  },
  status: {
    format: (status, task) => {
      const isRopSubmission = (get(task, 'data.model') || get(task, 'model')) === 'rop' && get(task, 'data.action') === 'submit';
      const className = classnames({ badge: true, complete: good.includes(status) || isRopSubmission, rejected: bad.includes(status) });

      const hasEnforcementCase = task.enforcementFlags && task.enforcementFlags.length > 0;
      const enforcementStatus = hasEnforcementCase && (task.enforcementFlags.some(f => f.status === 'open') ? 'open' : 'closed');

      return (
        <div className="badges">
          <span className={ className }><Snippet>{ `status.${status}.state` }</Snippet></span>
          {
            hasEnforcementCase &&
              <span className={`badge enforcement ${enforcementStatus}`}>
                <Snippet>{`enforcementCase.badge.${enforcementStatus}`}</Snippet>
              </span>
          }
        </div>
      );
    }
  },
  activeDeadline: {
    format: (deadline, task) => {
      return (
        <Deadline task={task} />
      );
    }
  },
  type: {
    format: (type, task) => {
      const id = get(task, 'id');
      const status = get(task, 'data.modelData.status') || get(task, 'modelStatus');
      const labelParams = {};
      let licence = get(task, 'data.model') || get(task, 'model');

      const normalisedType = type === 'grant' && status === 'active' ? 'update' : type;

      let contextLabel = null;
      let title = null;
      if (licence === 'project') {
        title = get(task, 'data.modelData.title') || get(task, 'projectTitle') || 'Untitled project';
      }

      if (licence === 'role') {
        labelParams.type = normalisedType === 'delete'
          ? get(task, 'data.modelData.type', '').toUpperCase()
          : get(task, 'data.data.type', '').toUpperCase();
      }

      switch (licence) {
        case 'rop':
          labelParams.year = get(task, 'data.modelData.year');
          // don't break, allow ROPs to also use the subject as the context label
          // eslint-ignore-next-line no-fallthrough
        case 'project':
        case 'pil':
        case 'trainingPil':
        case 'role':
        case 'profile':
          const subject = get(task, 'data.subject') || get(task, 'subject');
          if (subject) {
            contextLabel = `${subject.firstName} ${subject.lastName}`;
          }
          break;

        case 'place':
          const placeName = get(task, 'data.modelData.name') || get(task, 'data.data.name') || get(task, 'placeName');
          if (placeName) {
            contextLabel = placeName;
          }
          break;
      }

      return (
        <div title={title}>
          <Link
            page="task.read"
            taskId={id}
            // adding optional snippet for backwards compatibility
            // as some task types won't have content defined.
            label={<Snippet {...labelParams} optional>{`tasks.${licence}.${normalisedType}`}</Snippet>}
          />
          {
            contextLabel && <span className="block smaller">{contextLabel}</span>
          }
        </div>
      );
    }
  },
  assignedTo: {
    format: (assignedTo, task) => <AssignTask task={task} />
  }
};
