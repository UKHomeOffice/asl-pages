/* eslint no-console: 0*/

import React from 'react';
import classnames from 'classnames';
import { map, get } from 'lodash';
import ReactMarkdown from 'react-markdown';
import { TextArea, Input, CheckboxGroup, RadioGroup, Select, DateInput } from '@ukhomeoffice/react-components';
import Snippet from '../containers/snippet';
import ConditionalReveal from './conditional-reveal';
import ToggleReveal from './toggle-reveal';

const fields = {
  inputText: props => <Input { ...props } />,
  inputEmail: props => <Input type="email" { ...props } />,
  inputPassword: props => <Input type="password" { ...props } />,
  inputDate: props => <DateInput { ...props } />,
  textarea: props => <TextArea { ...props } />,
  radioGroup: props => <RadioGroup { ...props } />,
  checkboxGroup: props => <CheckboxGroup { ...props } />,
  select: props => <Select { ...props } />,
  text: props => props.value &&
    <div className={classnames('govuk-form-group', props.name)}>
      <h3>{ props.label }</h3>
      <ReactMarkdown>{ props.value }</ReactMarkdown>
    </div>,
  dateInput: props => <DateInput { ...props } />
};

const Form = ({
  schema,
  model,
  csrfToken,
  errors = {},
  onFieldChange
}) => {
  return <form method="POST" noValidate>
    {
      map(schema, ({ inputType, conditionalReveal, toggleReveal, showIf, accessor, format, ...props }, key) => {
        const value = accessor ? get(model[key], accessor) : (model[key] || '');
        const field = fields[inputType]({
          key,
          value: format ? format(value) : value,
          label: <Snippet>{`fields.${key}.label`}</Snippet>,
          hint: <Snippet optional>{`fields.${key}.hint`}</Snippet>,
          name: key,
          error: errors[key] && <Snippet>{`errors.${key}.${errors[key]}`}</Snippet>,
          onChange: e => onFieldChange(key, e.target.value),
          ...props
        });

        if (showIf && !showIf(model)) {
          return null;
        }

        if (conditionalReveal) {
          return (
            <ConditionalReveal
              fieldName={key}
              value={model[`conditional-reveal-${key}`]}
              label={<Snippet>{`fields.${key}.conditionalReveal.label`}</Snippet>}
              yesLabel={<Snippet>{`fields.${key}.conditionalReveal.yesLabel`}</Snippet>}
              noLabel={<Snippet>{`fields.${key}.conditionalReveal.noLabel`}</Snippet>}
            >{ field }</ConditionalReveal>
          );
        }

        if (toggleReveal) {
          return (
            <ToggleReveal
              fieldName={key}
              value={model[`toggle-reveal-${key}`]}
              label={<Snippet>{`fields.${key}.toggleReveal.label`}</Snippet>}
            >{ field }</ToggleReveal>
          );
        }

        return field;
      })

    }
    <input type="hidden" name="_csrf" value={csrfToken} />
    <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
  </form>;
};

export default Form;
