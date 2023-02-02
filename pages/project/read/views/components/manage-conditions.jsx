import React from 'react';
import { Snippet, Link } from '@asl/components';
import Subsection from './subsection';
import get from "lodash/get";
import {useSelector} from "react-redux";
import { Button } from '@ukhomeoffice/react-components';

const getUngrantedVersion = project => {
  return ['draft', 'submitted'].includes(project.versions[0].status) ? project.versions[0] : null;
};

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

export default function ManageConditions() {

  const project = useSelector(state => state.model);
  const {url, openTask, editable, asruUser, canUpdate, additionalAvailability } = useSelector(state => state.static);

  const amendmentInProgress = get(project, 'versions[0].status') !== 'granted';

  return (
    <Subsection
      title={<Snippet>conditions.title</Snippet>}
      >
      {
        amendmentInProgress ? (
          <div className="margin-bottom">
            {
              openTask
                ? (
                  <span>The establishment has an outstanding task for this project licence, wait for this to be resolved.</span>

                )
                : <span>Conditions cannot be amended because the establishment has initiated an amendment to this project which hasn't yet been submitted.</span>
            }
          </div>
        ) : (
          <div>
            <div className="margin-bottom"><span><Snippet>conditions.content</Snippet></span></div>
            <form method="POST" action={`${url}/manage-conditions`}>
              <Button className="button-secondary">
                <Snippet>actions.manageConditions</Snippet>
              </Button>
            </form>
          </div>
          )
      }
    </Subsection>
  )
}
