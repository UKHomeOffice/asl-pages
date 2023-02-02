import React from 'react';
import Conditions from '../components/conditions';
import {Details, Inset, Link, Snippet, StickyNavAnchor, StickyNavPage} from '@asl/components';
import TaskDetails from '../components/task-details';
import { useSelector, shallowEqual } from 'react-redux';
import classnames from "classnames";
import ActivityLog from "../components/activity-log";

export default function ManageConditions({ task, formFields }) {
  const { version, schema, project } = useSelector(state => state.static, shallowEqual)

  console.log('activityLog')
  console.log(task.activityLog);

  // manually change the 'next steps' form to only allow certain outcomes with custom wording

  // const oldOptions = formFields.props.children[0].props.schema.status.options
  //
  // // if (task.status === 'returned-to-applicant') {
  // //   const submitApp
  // // }
  //
  // const amendApp = formFields.props.children[0].props.schema.status.options[0]
  // const rejectApp = formFields.props.children[0].props.schema.status.options[1]
  // const returnApp = formFields.props.children[0].props.schema.status.options[2]
  //
  // console.log(returnApp);
  //
  // if(returnApp) {
  //   returnApp.label = 'Propose new conditions';
  //   returnApp.hint = 'Send the new conditions to the PPL holder.';
  //   rejectApp.label = 'Cancel conditions changes';
  //   rejectApp.hint = 'Any changes you have made will not be saved.'
  //
  //   const firstSubmitOptions = [returnApp, rejectApp];
  //   formFields.props.children[0].props.schema.status.options = firstSubmitOptions;
  // }

  // end

  return (

    <StickyNavPage>
      <StickyNavAnchor id="details">
        <TaskDetails task={task} />
      </StickyNavAnchor>

      {/*<StickyNavAnchor id="activity">*/}
      {/*  <ActivityLog task={task} />*/}
      {/*</StickyNavAnchor>*/}

      {/*<StickyNavAnchor id="manage-conditions">*/}
      {/*  <Conditions conditions={version.data.conditions} project={version}/>*/}
      {/*</StickyNavAnchor>*/}

      <StickyNavAnchor id="next-steps">
        { formFields }
      </StickyNavAnchor>
    </StickyNavPage>
  )
}
