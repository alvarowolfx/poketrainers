
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteFieldTemplate = (locals) => {
  return (
    <AutoComplete
      openOnFocus
      searchText={locals.value}
      value={locals.value}
      dataSource={locals.options}
      onNewRequest={(chosen, index) => locals.onChange(locals.options[index].value) }
      floatingLabelText={locals.label}
      filter={AutoComplete.fuzzyFilter}/>
  );
};

export default AutoCompleteFieldTemplate;
