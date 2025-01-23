import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet, FormLayout, Fieldset, Inset, Header } from '@ukhomeoffice/asl-components';

const Page = ({}) => {
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
      />
      <p>
        <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} className="govuk-button" />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { addRoleTasks, schema, profile } }) => ({ addRoleTasks, schema, profile });
export default connect(mapStateToProps)(Page);
