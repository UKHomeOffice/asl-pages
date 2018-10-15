import React from 'react';
import { mapKeys } from 'lodash';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';
import Inset from '../../../common/views/components/inset';
import Fieldset from '../../../common/views/components/fieldset';
import { setField } from '../../../../lib/actions';

const connectComponent = key => {
  const mapStateToProps = state => {
    const schema = state.static.schema.modules.options.find(m => m.value === key).reveal
    return {
      model: state.model,
      schema: mapKeys(schema, (v, k) => `module-${key}-${k}`)
    }
  };

  return connect(mapStateToProps)(Fieldset);
}

const formatters = {
  modules: {
    mapOptions: (op, b) => {
      const ConnectedComponent = connectComponent(op.value)
      return {
        ...op,
        prefix: op.value,
        reveal: (
          <Inset><ConnectedComponent /></Inset>
        )
      }
    }
  }
}

const Page = () => (
  <FormLayout formatters={formatters}>
    <header>
      <h1>
        <Snippet>pil.exemptions.title</Snippet>
      </h1>
      <span className="govuk-hint">
        <Snippet>pil.exemptions.hint</Snippet>
      </span>
    </header>
  </FormLayout>
);

export default Page;
