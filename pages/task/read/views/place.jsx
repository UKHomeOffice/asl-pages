import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Diff,
  Snippet,
  Field,
  StickyNavPage,
  StickyNavAnchor,
  ModelSummary
} from '@asl/components';
import { schema } from '../../../place/schema';
import formatters from '../../../place/formatters';
import { hasChanged } from '../../../../lib/utils';

const LicenceHolder = ({ type, profile }) => (
  <Fragment>
    <dt><Snippet>{type}</Snippet></dt>
    <dd>{`${profile.firstName} ${profile.lastName}`}</dd>
  </Fragment>
);

const Playback = ({ task, values = {}, model, establishment, formFields, isAsru, children }) => (
  <StickyNavPage>

    { children }

    <StickyNavAnchor id="details">
      <h2><Snippet>sticky-nav.details</Snippet></h2>
      <dl className="inline">
        <dt><Snippet>establishment</Snippet></dt>
        <dd>{ establishment.name }</dd>

        <dt><Snippet>licenceNumber</Snippet></dt>
        <dd>{ establishment.licenceNumber }</dd>
        {
          establishment.pelh && <LicenceHolder type="pelh" profile={establishment.pelh} />
        }
        {
          establishment.nprc && <LicenceHolder type="nprc" profile={establishment.nprc} />
        }
      </dl>
    </StickyNavAnchor>
    {
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff values={task.data.data} model={values} schema={schema} formatters={formatters} comparator={hasChanged} />
        </StickyNavAnchor>
      )
    }
    {
      (task.data.action === 'create' || task.data.action === 'delete') && (
        <StickyNavAnchor id={task.data.action}>
          <h2><Snippet>{`sticky-nav.${task.data.action}`}</Snippet></h2>
          <ModelSummary formatters={formatters} model={task.data.action === 'delete' ? values : task.data.data} schema={schema} />
        </StickyNavAnchor>
      )
    }
    {
      values.restrictions && (
        <StickyNavAnchor id="restrictions">
          <Field
            editable={isAsru && !!task.nextSteps.length && !task.data.data.restrictions}
            name="restrictions"
            title={<Snippet>sticky-nav.restrictions</Snippet>}
            content={values.restrictions}
          />
        </StickyNavAnchor>
      )
    }
    {
      (task.data.meta && task.data.meta.changesToRestrictions) && (
        <StickyNavAnchor id="changes-to-restrictions">
          <Field
            title={<Snippet>sticky-nav.changes-to-restrictions</Snippet>}
            content={task.data.meta.changesToRestrictions}
          />
        </StickyNavAnchor>
      )
    }
    {
      task.data.data.restrictions && (
        <StickyNavAnchor id="new-restrictions">
          <Field
            editable={isAsru && !!task.nextSteps.length}
            name="restrictions"
            title={<Snippet>sticky-nav.new-restrictions</Snippet>}
            content={task.data.data.restrictions}
          />
        </StickyNavAnchor>
      )
    }
    {
      (task.data.meta && task.data.meta.comments) && (
        <StickyNavAnchor id="comments">
          <Field
            title={<Snippet>sticky-nav.comments</Snippet>}
            content={task.data.meta.comments}
          />
        </StickyNavAnchor>
      )
    }
    {
      !!task.nextSteps.length && (
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          {
            formFields
          }
        </StickyNavAnchor>
      )
    }
  </StickyNavPage>
);

const mapStateToProps = ({ model, static: { values, establishment, isAsru } }) => ({ model, values, establishment, isAsru });

export default connect(mapStateToProps)(Playback);
