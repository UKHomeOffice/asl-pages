import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {
  render() {
    const { id: estId } = this.props.establishment;
    const isOwnProfile = this.props.isOwnProfile || false;

    const {
      pil,
      telephone,
      email,
      roles,
      projects,
      establishments,
      id
    } = this.props.profile;

    const allowedActions = this.props.allowedActions;
    const title = this.props.title;
    const activeProjects = projects.filter(
      ({ establishmentId, status }) =>
        status === 'active' && establishmentId === estId
    );
    const estRoles = roles.filter(
      ({ establishmentId }) => establishmentId === estId
    );

    const profileRole = establishments.find(est => est.id === estId).role;
    const pilIncomplete = pil && pil.status !== 'active';
    const pilActive = pil && pil.status === 'active';

    return (
      <Fragment>
        {title && <h3>{title}</h3>}
        <p>
          <Link
            page='establishment.dashboard'
            establishmentId={estId}
            label='About this establishment'
          />
        </p>

        <hr />

        {activeProjects && (
          <Fragment>
            <dl>
              <dt>
                <Snippet>projects.title</Snippet>
              </dt>
              <dd>
                {!isEmpty(activeProjects) &&
                  activeProjects.map(
                    project =>
                      project.status && (
                        <Fragment key={project.id}>
                          <p>
                            <Link page='project.list' label={project.title} />
                          </p>
                          <p>
                            <span>
                              <Snippet licenceNumber={project.licenceNumber}>
                                projects.licenceNumber
                              </Snippet>
                            </span>
                          </p>
                          <p>
                            <span>
                              <Snippet
                                expiryDate={format(
                                  project.expiryDate,
                                  dateFormat.medium
                                )}
                              >
                                projects.expiryDate
                              </Snippet>
                            </span>
                          </p>
                        </Fragment>
                      )
                  )}
                {isEmpty(activeProjects) && (
                  <Snippet>projects.noProjects</Snippet>
                )}
              </dd>
            </dl>
          </Fragment>
        )}

        {
          (allowedActions.includes('project.apply') && <Fragment>
            <form method='POST' action={`/e/${estId}/projects/create`}>
              <p>
                <Button className='govuk-button add-margin'>
                  <Snippet>buttons.pplApply</Snippet>
                </Button>
              </p>
            </form>
          </Fragment>)
        }

        <hr />

        {
          <Fragment>
            <dl>
              <dt>
                <Snippet>responsibilities.title</Snippet>
              </dt>

              {!isEmpty(estRoles) && (
                <Fragment>
                  {estRoles.map(({ type, id }) => (
                    <dd key={id}>{defineValue(type.toUpperCase())}</dd>
                  ))}
                </Fragment>
              )}
              {isEmpty(estRoles) && (
                <dd>
                  <Snippet>responsibilities.noRoles</Snippet>
                </dd>
              )}
            </dl>
          </Fragment>
        }

        {
          allowedActions.includes('profile.roles') &&
          <p>
            <Link
              page='profile.role.apply.base'
              establishmentId={estId}
              profileId={id}
              className='govuk-button'
              label={<Snippet>responsibilities.roleApply</Snippet>}
            />
          </p>
        }

        <hr />

        <dl>
          <dt>
            <Snippet>pil.title</Snippet>
          </dt>
          {pil && pil.licenceNumber && (
            <Fragment>
              <dd>
                <Link
                  page='pil.read'
                  pilId={pil.id}
                  label={pil.licenceNumber}
                />
              </dd>
            </Fragment>
          )}
          {!pil && (
            <dd>
              <Snippet>pil.noPil</Snippet>
            </dd>
          )}
          {
            pil && pilIncomplete && (<dd>
              <Snippet>pil.incompletePil</Snippet>
            </dd>)
          }
        </dl>
        {
          (isOwnProfile || allowedActions.includes('pil.create')) && !pilActive &&
          <p>
            <Link
              page='pil.create'
              establishmentId={estId}
              profileId={id}
              className='govuk-button'
              label={<Snippet>{`buttons.${pilIncomplete ? 'view' : 'pilApply'}`}</Snippet>}
            />
          </p>
        }

        <hr />

        {(telephone || email) && (
          <Fragment>
            <dl>
              <dt>
                <Snippet>contactDetails.title</Snippet>
              </dt>
              {email && (
                <Fragment>
                  <dd>
                    <Snippet>contactDetails.email</Snippet>:{' '}
                    <a href={`mailto:${email}`}>{email}</a>
                  </dd>
                </Fragment>
              )}
              {telephone && (
                <Fragment>
                  <dd>
                    <Snippet>contactDetails.telephone</Snippet>
                    <p>{telephone}</p>
                  </dd>
                </Fragment>
              )}
            </dl>
          </Fragment>
        )}

        <hr />

        <dl>
          {allowedActions.includes('profile.permissions') && (
            <Fragment>
              <dt>
                <Snippet role={profileRole}>permissionLevel.title</Snippet>
              </dt>
              <dt>{profileRole}</dt>
              <dd>
                <Link
                  page='profile.permission'
                  establishmentId={estId}
                  profileId={id}
                  label={<Snippet>pages.profile.permission.change</Snippet>}
                />
              </dd>
            </Fragment>
          )}
        </dl>
      </Fragment>
    );
  }
}

export default Profile;
