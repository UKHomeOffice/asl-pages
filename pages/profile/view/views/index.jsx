import React, { Fragment } from 'react';
import { isEmpty, map, chain } from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import dictionary from '@asl/dictionary';
import Accordion from '../../../common/views/components/accordion';
import ExpandingPanel from '../../../common/views/components/expanding-panel';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const getPremises = roles => {
  if (!roles) {
    return null;
  }
  const nacwo = roles.find(role => role.type === 'nacwo');
  if (!nacwo) {
    return null;
  }
  return chain(nacwo.places)
    .groupBy('site')
    .mapValues(v => chain(v)
      .groupBy('area')
      .mapValues(p => p.map(place => place.name))
      .value()
    )
    .value();
};

const Index = ({
  model: {
    name,
    pil,
    qualifications,
    address,
    postcode,
    telephone,
    email,
    roles,
    projects,
    trainingModules
  },
  establishment: {
    name: establishmentName
  },
  ...props
}) => {
  const formatDate = date => moment(date).format('Do MMMM YYYY');
  const premises = getPremises(roles);
  const hasNacwoQualifications = roles.length > 0 && roles.find(role => role.type === 'nacwo') && qualifications;
  return (
    <Fragment>
      <article className='profile grid-row'>
        <div className='column-two-thirds'>
          <header>
            <h2>&nbsp;</h2>
            <h1>{ name }</h1>
          </header>

          <dl className="inline">
            <dt><Snippet>establishment</Snippet></dt>
            <dd>{establishmentName}</dd>
            {
              pil && pil.licenceNumber && (
                <Fragment>
                  <dt><Snippet>licenceNumber</Snippet></dt>
                  <dd>{pil.licenceNumber}</dd>
                </Fragment>
              )
            }
          </dl>
          <Accordion>
            {
              (!isEmpty(roles) || !isEmpty(premises)) && (
                <ExpandingPanel title="Responsibilities">
                  <dl className="inline">
                    {
                      !isEmpty(roles) && (
                        <Fragment>
                          <dt><Snippet>roles</Snippet></dt>
                          <dd>
                            <ul>
                              {
                                roles.map(({ type, id }) =>
                                  <li key={id}>{dictionary[type] || dictionary[type.toUpperCase()]} ({type.toUpperCase()})</li>
                                )
                              }
                            </ul>

                          </dd>
                        </Fragment>
                      )
                    }
                    {
                      !isEmpty(premises) && (
                        <Fragment>
                          <dt><Snippet>premises</Snippet></dt>
                          <dd>
                            <ul>
                              {
                                map(premises, (p, site) =>
                                  <li key={site}>
                                    {site}
                                    {
                                      map(p, (names, area) =>
                                        <Fragment key={area}>
                                          {
                                            area !== 'null'
                                              ? <Fragment>, {area} - <br /></Fragment>
                                              : <Fragment> - <br /></Fragment>
                                          }
                                          {
                                            names.join(', ')
                                          }
                                        </Fragment>
                                      )
                                    }
                                  </li>
                                )
                              }
                            </ul>
                          </dd>
                        </Fragment>
                      )
                    }
                  </dl>
                </ExpandingPanel>
              )
            }
            {
              projects && projects.length > 0 && (
                <ExpandingPanel title={<Snippet>projects.title</Snippet>}>
                  <dl className="inline">
                    <dt><Snippet>projects.projectTitles</Snippet></dt>
                    <dd>
                      <dl>
                        {
                          projects.map(project =>
                            <Fragment key={project.id}>
                              <dt>
                                <Link page="project.list" label={project.title} />
                              </dt>
                              <dd>
                                <span><Snippet licenceNumber={project.licenceNumber}>projects.licenceNumber</Snippet></span>
                              </dd>
                            </Fragment>
                          )
                        }
                      </dl>
                    </dd>
                  </dl>
                </ExpandingPanel>
              )
            }
            {
              (hasNacwoQualifications || !isEmpty(trainingModules)) && (
                <ExpandingPanel title={<Snippet>training.title</Snippet>}>
                  {
                    hasNacwoQualifications && (
                      <dl className="inline">
                        <dt><Snippet>training.nacwo</Snippet></dt>
                        <dd>{qualifications}</dd>
                      </dl>
                    )
                  }
                  {
                    !isEmpty(trainingModules) && (
                      <dl className="inline">
                        <dt><Snippet>training.modules</Snippet></dt>
                        <dd>
                          <dl>
                            {
                              map(trainingModules, (module, index) =>
                                <Fragment key={index}>
                                  <dt>{module.module}</dt>
                                  <dd><Snippet date={formatDate(module.pass_date)}>training.dateCompleted</Snippet></dd>
                                </Fragment>
                              )
                            }
                          </dl>
                        </dd>
                      </dl>
                    )
                  }
                </ExpandingPanel>
              )
            }
            {
              (address || telephone || email) && (
                <ExpandingPanel title={<Snippet>contactDetails.title</Snippet>}>
                  <dl className="inline">
                    {
                      address && (
                        <Fragment>
                          <dt><Snippet>contactDetails.professionalAddress</Snippet></dt>
                          <dd>{address}<br />{postcode}</dd>
                        </Fragment>
                      )
                    }
                    {
                      telephone && (
                        <Fragment>
                          <dt><Snippet>contactDetails.telephone</Snippet></dt>
                          <dd>{telephone}</dd>
                        </Fragment>
                      )
                    }
                    {
                      email && (
                        <Fragment>
                          <dt><Snippet>contactDetails.email</Snippet></dt>
                          <dd><a href={`mailto:${email}`}>{email}</a></dd>
                        </Fragment>
                      )
                    }
                  </dl>
                </ExpandingPanel>
              )
            }
          </Accordion>
        </div>
      </article>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment }, model }) => ({ establishment, model });

module.exports = connect(mapStateToProps)(Index);
