import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { Markdown, ConditionReminders } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import CONDITIONS from '@asl/projects/client/constants/conditions';
import Editable from '@asl/projects/client/components/editable';
import { updateConditions } from '@asl/projects/client/actions/projects';

function Condition({
                     conditionKey,
                     title,
                     deleted,
                     updating,
                     edited,
                     content,
                     custom,
                     inspectorAdded,
                     number,
                     singular,
                     className,
                     onSave,
                     onRemove,
                     reminders
                   }) {
  const [editing, setEditing] = useState(false);

  function handleSave({ content, reminders }) {
    onSave({ edited: content, reminders })
      .then(() => setEditing(false));
  }

  function handleRevert() {
    onSave({ edited: null })
      .then(() => setEditing(false));
  }

  const displayContent = edited || content;
  const displayReminders = !editing && conditionKey && reminders && (reminders.active || []).includes(conditionKey);

  return (
    <div className={className}>
      <h2>{singular} {number}</h2>
      <div className={classnames('condition', { deleted })}>
        <h3>{title}</h3>
        {
          deleted
            ? (
              <Fragment>
                <em>This {singular.toLowerCase()} has been removed</em>
                <p>
                  <Button
                    disabled={updating}
                    className="link"
                    onClick={onSave.bind(null, { deleted: false })}
                  >
                    Restore
                  </Button>
                </p>
              </Fragment>
            )
            : (
              <Fragment>
                {
                  editing
                    ? <Editable
                      conditionKey={conditionKey}
                      content={displayContent}
                      edited={!!edited}
                      updating={updating}
                      onSave={handleSave}
                      onCancel={setEditing.bind(null, false)}
                      onRevert={handleRevert}
                      showRevert={!custom}
                      reminders={reminders}
                    />
                    : <Markdown className="condition-text">{displayContent}</Markdown>
                }
              </Fragment>
            )
        }
      </div>
      {
        displayReminders && <ConditionReminders reminders={reminders[conditionKey]} />
      }
      {
        !editing && (
          <p>
            <Button
              disabled={updating}
              className="link"
              onClick={setEditing.bind(null, true)}
            >
              Edit
            </Button>
            {' | '}
            <Button
              disabled={updating}
              className="link"
              onClick={onRemove.bind(null, custom || inspectorAdded)}
            >
              Remove
            </Button>
          </p>
        )
      }
    </div>
  );
}

export default function Conditions({ updating, conditions, authorisations, project }) {
  console.log(conditions);

  const [ state, setState ] = useState({updating: updating || false});
  updating = state.updating;
  const scope = 'project';
  const dispatch = useDispatch();
  const type = 'condition';
  const saveConditions = conditions => dispatch(updateConditions(type, conditions))

  const handleSave = key => data => {
    setState({ updating: true });
    const conditionsToSave = conditions.map(condition => {
      if (condition.key === key) {
        return {
          ...condition,
          ...data
        };
      }
      return condition;
    });
    return saveConditions(conditionsToSave)
      .then(() => setState({ updating: false }));
  };

  const handleRemove = key => custom => {
    if (custom) {
      if (window.confirm('Are you sure?')) {
        setState({ updating: true });
        return saveConditions(conditions.filter(condition => condition.key !== key))
          .then(() => setState({ updating: false }));
      }
    } else {
      handleSave(key)({ deleted: true });
    }
  };

  // ra conditions used to be added to the conditions array, we dont want to show them here.
  const notRa = conditions.filter(c => !c.key.match(/^retrospective-assessment/));
  const isNotRa = notRa.length === 0;

  return (
    <div className="conditions">
      {
      isNotRa
        ? <p><em>No {authorisations ? 'authorisations' : 'conditions'} added</em></p>
        : notRa.map((condition, index) => {
          const template = get(CONDITIONS[scope], condition.path, {});
          const { title, content } = template;
          return <Condition
            key={condition.key}
            conditionKey={condition.key}
            className={condition.key}
            updating={updating}
            title={title}
            number={index + 1}
            custom={condition.custom}
            content={content}
            {...condition}
            onSave={handleSave(condition.key)}
            onRemove={handleRemove(condition.key)}
          />;
        })
      }
    </div>
  );
}
