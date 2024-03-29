import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classnames from 'classnames';
import { dateFormat } from '../../../../constants';
import { formatDate, canUpdateModel } from '../../../../lib/utils';
import { differenceInCalendarDays } from 'date-fns';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import schema from '../schema';
import {
  Link,
  Snippet,
  ModelSummary,
  Conditions,
  DocumentHeader,
  LicenceStatusBanner
} from '@ukhomeoffice/asl-components';
import ProceduresDiff from '../../procedures/views/diff';
import { Warning } from '@ukhomeoffice/react-components';
import RelatedTasks from '../../../task/list/views/related-tasks';
import EnforcementFlags from '../../../enforcement/components/enforcement-flags';
import Reminders from '../../../common/components/reminders';

function SuspendReinstateLicence({ pil }) {
  const canSuspend = useSelector(state => state.static.canSuspend);
  const isSuspended = !!pil.suspendedDate;
  const action = isSuspended ? 'reinstate' : 'suspend';

  if (pil.status !== 'active' || !canSuspend) {
    return null;
  }

  return (
    <section className={`${action}-licence`}>
      <Snippet>{`action.${action}.summary`}</Snippet>
      <Link
        page={`pil.${action}`}
        className={classnames('govuk-button', action === 'suspend' ? 'button-suspend' : 'button-primary')}
        pilId={pil.id}
        establishmentId={pil.establishmentId}
        label={<Snippet>{`action.${action}.button`}</Snippet>}
      />
    </section>
  );
}

export default function PIL({ pil }) {
  pil = pil || useSelector(state => state.static.pil);

  const {
    profile,
    canUpdate,
    canReapply,
    allowedActions,
    canDownload,
    openTask,
    isLicenceHolder,
    user,
    pilReviewRequired,
    reviewUrl,
    showRelatedTasks,
    canApply,
    errors
  } = useSelector(state => state.static, shallowEqual);

  const pilSchema = pil.status === 'revoked' ? omit(schema, 'reviewDate', 'updatedAt') : omit(schema, 'revocationDate');
  const canUpdateConditions = allowedActions.includes('pil.updateConditions') && pil.status === 'active';

  const formatters = {
    issueDate: {
      format: issueDate => formatDate(issueDate, dateFormat.long)
    },
    licenceNumber: {
      format: l => profile.pilLicenceNumber
    },
    updatedAt: {
      format: (updatedAt, pil) => differenceInCalendarDays(updatedAt, pil.issueDate) > 0
        ? formatDate(updatedAt, dateFormat.long)
        : '-'
    },
    revocationDate: {
      format: revocationDate => formatDate(revocationDate, dateFormat.long)
    },
    reviewDate: {
      format: reviewDate => formatDate(reviewDate, dateFormat.long)
    },
    establishment: {
      format: (e, model) => {
        return e && e.name ? e.name : 'This licence is held at another establishment.';
      }
    },
    species: {
      format: pilSpecies => {
        if (!pilSpecies) {
          return '-';
        }
        if (!Array.isArray(pilSpecies)) {
          return;
        }

        return (
          <ul className="species-list">
            { pilSpecies.map(species => <li key={species}>{species}</li>) }
          </ul>
        );
      }
    },
    procedures: {
      format: (procedures, pil) => {
        if (!procedures) {
          return '-';
        }
        return <ProceduresDiff after={procedures} afterPil={pil} />;
      }
    },
    conditions: {
      format: conditions => {
        return (
          <Conditions
            conditions={conditions}
            canUpdate={!openTask && canUpdateConditions && canUpdateModel(pil)}
            label={<Snippet>conditions.hasConditions</Snippet>}
            noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
            editing={!isEmpty(errors)}
            reminders={pil.reminders}
          >
            {
              openTask && canUpdateConditions && (
                <Warning>
                  <Snippet>updateInProgress</Snippet>
                  <p><Link page="task.read" taskId={openTask.id} label={<Snippet>view-task</Snippet>} /></p>
                </Warning>
              )
            }
          </Conditions>
        );
      }
    }
  };

  let amendButtonSnippet = 'action.reapply.button';
  let userType = user.asruUser
    ? 'asru'
    : (isLicenceHolder ? 'licenceHolder' : 'other');

  if (pil.status === 'active') {
    amendButtonSnippet = `action.amend.${userType}.button`;
  }

  let amendIntroSnippet = `action.amend.${userType}.summary`;
  if (pil.procedures.find(p => p.key === 'E')) {
    amendIntroSnippet = 'action.amend.update.summary';
    amendButtonSnippet = 'action.amend.update.button';
  }

  return (
    <Fragment>
      <LicenceStatusBanner licence={pil} licenceType="pil" />
      <EnforcementFlags model={pil} />
      <Reminders model={pil} licenceType="Personal" />
      {
        pilReviewRequired && (
          <Warning className="info pil-review">
            <Snippet
              reviewUrl={reviewUrl}
              openTask={openTask}
              overdue={pil.reviewOverdue}
            >
              warnings.pilReviewRequired
            </Snippet>
          </Warning>
        )
      }

      <DocumentHeader
        subtitle={`${profile.firstName} ${profile.lastName}`}
        title={<Snippet>page.title</Snippet>}
      >
        {
          canDownload &&
            <dl>
              <dt>Downloads</dt>
              <dd>
                <ul>
                  <li><Link page="pil.pdf" label={<Snippet>action.download.pdf</Snippet>} /></li>
                </ul>
              </dd>
            </dl>
        }
      </DocumentHeader>

      <ModelSummary model={pil} formatters={formatters} schema={pilSchema} formatNullValue={true} />

      {
        canApply && (
          <div className="licence-actions">
            <section className="amend-licence">
              <Snippet>action.amend.apply.summary</Snippet>
              <Link
                page="pil.create"
                className="govuk-button button-secondary"
                label={<Snippet>action.amend.apply.button</Snippet>}
              />
            </section>
          </div>
        )
      }

      {
        canUpdate && (
          <div className="licence-actions">
            <Fragment>
              {
                openTask &&
                  <Fragment>
                    <section className="open-task">
                      <h2><Snippet>{`openTask.${openTask.type}.title`}</Snippet></h2>
                      <p><Snippet>{`openTask.${openTask.type}.description`}</Snippet></p>
                      <Link page="task.read" taskId={openTask.id} label={<Snippet>view-task</Snippet>} className="govuk-button button-secondary" />
                    </section>
                    <SuspendReinstateLicence pil={pil} />
                  </Fragment>
              }

              {
                !openTask && pil.status === 'active' &&
                  <Fragment>
                    <section className="amend-licence">
                      <Snippet>{amendIntroSnippet}</Snippet>
                      <Link
                        page="pil.update"
                        className="govuk-button button-secondary"
                        pilId={pil.id}
                        establishmentId={pil.establishmentId}
                        label={<Snippet>{amendButtonSnippet}</Snippet>}
                      />
                    </section>

                    <SuspendReinstateLicence pil={pil} />

                    <section className="revoke-licence">
                      <Snippet>action.revoke.summary</Snippet>
                      <Link
                        page="pil.revoke"
                        className="govuk-button button-warning"
                        pilId={pil.id}
                        establishmentId={pil.establishmentId}
                        label={<Snippet>action.revoke.button</Snippet>}
                      />
                    </section>
                  </Fragment>
              }

              {
                !openTask && pil.status === 'revoked' && canReapply &&
                  <section className="amend-licence">
                    <Snippet>{`action.amend.reapply.summary`}</Snippet>
                    <Link
                      page="pil.update"
                      pilId={pil.id}
                      className="govuk-button button-secondary"
                      establishmentId={pil.establishmentId}
                      label={<Snippet>action.amend.reapply.button</Snippet>}
                    />
                  </section>
              }

              {
                !openTask && pil.status === 'revoked' && !canReapply && profile.over18 &&
                  <section className="apply-licence">
                    <Snippet>{`action.reapply.summary`}</Snippet>
                    <Link
                      page="pil.create"
                      className="govuk-button button-secondary"
                      label={<Snippet>action.reapply.button</Snippet>}
                    />
                  </section>
              }
            </Fragment>
          </div>
        )
      }

      { showRelatedTasks && <RelatedTasks /> }
    </Fragment>
  );
}
