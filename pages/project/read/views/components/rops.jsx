import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';
import isBefore from 'date-fns/is_before';
import Subsection from '../components/subsection';

const START_DATE = '2021-01-01';

export default function Rops() {
  const { url, project } = useSelector(state => state.static);

  const draftRop = project.rops.find(rop => rop.status === 'draft');
  const submittedRop = project.rops.find(rop => rop.status === 'submitted');

  const endDate = project.revocationDate || project.expiryDate;
  const ropNotRequired = isBefore(new Date(endDate), new Date(START_DATE));

  if (ropNotRequired) {
    return (
      <Subsection
        title={<Snippet>rops.title</Snippet>}
        content={<strong><Snippet>rops.not-due</Snippet></strong>}
      />
    );
  }

  return (
    <Subsection
      title={<Snippet>rops.title</Snippet>}
      content={<Snippet year="2021">{ submittedRop ? 'rops.submitted' : 'rops.content' }</Snippet>}
    >
      {
        submittedRop
          ? <Link
            className="govuk-button button-secondary"
            page="rops.procedures"
            ropId={submittedRop.id}
            label={<Snippet>rops.read</Snippet>}
          />
          : (
            <Fragment>
              <p><Snippet deadline={format(project.ropsDeadline, dateFormat.long)}>rops.deadline</Snippet></p>
              {
                draftRop
                  ? <Link
                    className="govuk-button button-secondary"
                    page="rops.update"
                    step="confirm"
                    ropId={draftRop.id}
                    label={<Snippet>rops.continue</Snippet>}
                  />
                  : (
                    <form method="POST" action={`${url}/rops`}>
                      <Button className="button-secondary">
                        <Snippet>rops.start</Snippet>
                      </Button>
                    </form>
                  )
              }
            </Fragment>
          )
      }
    </Subsection>
  );
}
