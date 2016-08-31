
import React from 'react';

export default (WrappedComponent) => {
  const TranslatableComponent = (props, context) => (
    <WrappedComponent {...props} t={context.t}/>
  );

  TranslatableComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
  };

  return TranslatableComponent;
}
