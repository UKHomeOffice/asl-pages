import { mapValues } from 'lodash';
import { connect } from 'react-redux';
import Form from '../components/form';
import { setField } from '../../../../lib/actions';

const extendSchema = (field, formatter) => {
  if (!formatter) {
    return field;
  }
  return {
    ...field,
    options: formatter.mapOptions ? field.options.map(formatter.mapOptions) : field.options,
    showIf: formatter.showIf
  };
};

const mapStateToProps = ({ static: { schema, errors, csrfToken }, model }, { formatters = {} }) => {
  return {
    model,
    errors,
    csrfToken,
    schema: mapValues(schema, (field, key) => extendSchema(field, formatters[key]))
  };
};

const mapDispatchToProps = dispatch => ({
  onFieldChange: (key, value) => dispatch(setField(key, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
