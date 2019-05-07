import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Link,
  Snippet,
  StickyNavAnchor,
  Header
} from '@asl/components';
import ActivityLog, { getStatus } from './activity-log';
import Pil from './pil';
import Place from './place';
import Profile from './profile';
import Role from './role';
import Project from './project';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import moment from 'moment-business-time';

const ExtraProjectMeta = ({ item, task }) => {
  const status = getStatus(item.eventName);
  if (status === 'with-inspectorate') {
    const versionId = get(item, 'event.data.data.version');

    return versionId
      ? <Link page="project.version.read" versionId={versionId} establishmentId={task.data.establishmentId} projectId={task.data.id} label="View this version"/>
      : null;
  }

  if (status === 'deadline-extension') {
    const deadline = moment(task.createdAt).addWorkingTime(40, 'days');
    const extended = cloneDeep(deadline).addWorkingTime(15, 'days');

    return <Fragment>
      <p><strong>Original deadline:</strong> { format(deadline.toDate(), dateFormat.medium) }</p>
      <p><strong>New deadline:</strong> { format(extended.toDate(), dateFormat.medium) }</p>
    </Fragment>;
  }

  return null;
};

const getTaskPlayback = task => {
  if (task.data.model === 'pil') {
    return (
      <Pil task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Pil>
    );
  }
  if (task.data.model === 'place') {
    return (
      <Place task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Place>
    );
  }
  if (task.data.model === 'profile') {
    return (
      <Profile task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Profile>
    );
  }
  if (task.data.model === 'role') {
    return (
      <Role task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} />
        </StickyNavAnchor>
      </Role>
    );
  }
  if (task.data.model === 'project') {
    return (
      <Project task={task}>
        <StickyNavAnchor id="activity">
          <ActivityLog task={task} ExtraMeta={ExtraProjectMeta} />
        </StickyNavAnchor>
      </Project>
    );
  }
};

const getTitle = action => {
  let key = 'title';
  if (action === 'create') {
    key = 'createTitle';
  }
  if (action === 'delete') {
    key = 'deleteTitle';
  }
  if (action === 'update') {
    key = 'updateTitle';
  }
  try {
    return <Snippet>{key}</Snippet>;
  } catch (e) {
    return <Snippet>title</Snippet>;
  }
};

const Task = ({ task }) => {
  const changedBy = task.data.changedBy;
  const formatDate = date => format(date, dateFormat.medium);

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header title={getTitle(task.data.action)} />

      <div className="govuk-inset-text submitted-by">
        <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
        <Link
          page="profile.view"
          profileId={changedBy.id}
          establishmentId={task.data.establishmentId}
          label={`${changedBy.firstName} ${changedBy.lastName}`}
        /><span>&nbsp;</span>
        <Snippet date={formatDate(parse(task.updatedAt))}>task.submittedOn</Snippet>
      </div>

      <dl className="current-status">
        <dt><Snippet>currentStatus</Snippet></dt>
        <dd><Snippet>{`status.${task.status}.state`}</Snippet></dd>
      </dl>

      { getTaskPlayback(task) }
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task } }) => ({ task });

export default connect(mapStateToProps)(Task);
