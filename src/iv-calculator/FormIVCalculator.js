import React from 'react';

import t from 'tcomb-form';
const Form = t.form.Form;

import SelectFieldTemplate from '../form/MaterialUISelectFieldTemplate';
import AutoCompleteFieldTemplate from '../form/MaterialUIAutocompleteFieldTemplate';
import TextFieldTemplate from '../form/MaterialUITextFieldTemplate';

import pokemons from '../data/pokemons';

const PokemonNameType = t.enums.of(
  pokemons.map( pkm => pkm.name)
);

const DustType = t.enums.of([
  400,600,800,1000,
  1300,1600,1900,2200,2500,
  3000,3500,4000,4500,5000,
  6000,7000,8000,9000,10000
]);

const PokemonFormSchema = t.struct({
  name: PokemonNameType,
  cp: t.Number,
  hp: t.Number,
  dust: DustType
});

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

export default class FormIVCalculator extends React.Component {

  render() {
    let options = {
      template: FormTemplate,
      fields: {
        name: {
          label: 'Qual o pokemon ?',
          template: AutoCompleteFieldTemplate,
          nullOption: false
        },
        cp: {
          label: 'CP',
          template: TextFieldTemplate
        },
        hp: {
          label: 'HP',
          template: TextFieldTemplate
        },
        dust: {
          label: 'Stardust necessária para power up',
          template: SelectFieldTemplate,
          nullOption: false
        }
      }
    };
    return (
      <div className="form-calculator">
        <Form ref="form"
          type={PokemonFormSchema}
          options={options}
          value={this.props.form}
          onChange={this.props.onFormChange}/>
      </div>
    );
  }
}
