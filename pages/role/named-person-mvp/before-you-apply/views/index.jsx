import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form } from '@ukhomeoffice/asl-components';

const Page = () => {

  const { profile } = useSelector(state => state.static, shallowEqual);

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form cancelLink="profile.read">
          {profile.firstName} {profile.lastName}
          <Header title={<Snippet>title</Snippet>}/>
          <p className="margin-bottom">{<Snippet>beforeYouNominateIntro</Snippet>}</p>
        </Form>
      </div>

      <div className="govuk-grid-column-one-third">
        <div className="govuk-!-padding-bottom-6"></div>
        <aside className="govuk-prototype-kit-common-templates-related-items" role="complementary">
          <h2><Snippet>supportingGuidanceTitle</Snippet></h2>
        </aside>
      </div>
    </div>

  );
};

export default Page;
