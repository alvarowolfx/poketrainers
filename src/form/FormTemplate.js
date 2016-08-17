
import React from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;

const FormTemplate = Form.templates.struct.clone({
  renderFieldset: (children, locals) => {
    //{children.map( (child,i) => (<div key={i}>{child}</div>) )}
    return (
      <div >
          {children}
      </div>
    )
  }
});

export default FormTemplate;
