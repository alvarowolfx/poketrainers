
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectFieldTemplate = (locals) => {
  let items = locals.options.map( ({value, text}, i) => {
    return (
      <MenuItem key={"opt_"+i} value={value} primaryText={text} />
    );
  });
  return (
    <SelectField
      value={locals.value}
      onChange={(evt, index, value) => locals.onChange(value) }
      floatingLabelText={locals.label}>
      {items}
    </SelectField>
  );
};

export default SelectFieldTemplate;
