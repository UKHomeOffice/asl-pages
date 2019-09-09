import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Inset,
  FormLayout,
  Header
} from '@asl/components';
import formatters from '../../formatters';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { canUpdateModel } from '../../../../lib/utils';

const pageFormatters = {
  restrictions: { showIf: model => model.restrictions },
  changeRestrictions: { showIf: model => model.restrictions }
};

const Page = ({ model }) => {
  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }
  return <FormLayout formatters={Object.assign({}, formatters, pageFormatters)}>
    <Header title={<Snippet>pages.place.edit</Snippet>} />
    <Inset>
      <p>
        <Snippet>inset</Snippet>
      </p>
    </Inset>
  </FormLayout>;
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
