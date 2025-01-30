import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, FormLayout } from '@ukhomeoffice/asl-components';

const Page = () => {

  const { profile } = useSelector(state => state.static, shallowEqual);

  return (
    <FormLayout cancelLink="profile.read">

      {profile.firstName} {profile.lastName}
      <Header
        title={<Snippet>title</Snippet>}
      />

      <p className="margin-bottom">{<Snippet>beforeYouNominateIntro</Snippet>}</p>

    </FormLayout>
  );
};

export default Page;
