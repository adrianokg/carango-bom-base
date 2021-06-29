import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

function Form({ fields, mainButton, secondaryButton }) {
  const [fieldStates, setFieldStates] = useState({});

  function changeFieldState(id, newValue) {
    const entryChanged = {};
    entryChanged[id] = newValue;
    setFieldStates({ ...fieldStates, ...entryChanged });
  }

  function makeTextFieldComponent(field) {
    return (
      <TextField
        name={field.name}
        key={field.name}
        label={field.label}
        required={field.required || false}
        type={field.type || 'text'}
        InputLabelProps={{ id: field.name }}
        inputProps={{ 'aria-labelledby': field.name }}
        variant="outlined"
        margin="normal"
        onChange={(event) => changeFieldState(field.name, event.target.value)}
        fullWidth
      />
    );
  }

  function makeAutocompleteComponent(field) {
    return (
      <Autocomplete
        name={field.name}
        key={field.name}
        options={field.options}
        data-testid="form-autocomplete"
        onChange={(event) => changeFieldState(field.name, event.target.value)}
        getOptionLabel={(option) => option}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label={field.label} variant="outlined" />}
      />
    );
  }

  const typeToFunction = {
    textfield: makeTextFieldComponent,
    autocomplete: makeAutocompleteComponent,
  };

  useEffect(() => {
    const entries = {};
    fields.forEach((field) => {
      entries[field.name] = '';
    });
    setFieldStates({ ...entries });
  }, [fields]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mainButton.onSubmit(fieldStates);
      }}
    >
      {
        fields.map((field) => {
          const componentType = field.componentType || 'textfield';
          return typeToFunction[componentType](field);
        })
      }
      <div data-testid="form-actions" className="action-itens">
        {secondaryButton
          && (
          <Button
            variant="outlined"
            className="action-item"
            color="primary"
            onClick={secondaryButton.onSubmit}
          >
            {secondaryButton.text}
          </Button>
          )}
        <Button
          type="submit"
          variant="contained"
          className="action-item"
          color="primary"
        >
          {mainButton.text}
        </Button>
      </div>
    </form>
  );
}

Form.defaultProps = {
  secondaryButton: null,
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      componentType: PropTypes.oneOf(['textfield', 'autocomplete']),
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      required: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  mainButton: PropTypes.exact({
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
  }).isRequired,
  secondaryButton: PropTypes.exact({
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
  }),
};

export default Form;
