import React from 'react';

import t from 'tcomb-form';
const Form = t.form.Form;

import SelectFieldTemplate from '../form/MaterialUISelectFieldTemplate';
import AutoCompleteFieldTemplate from '../form/MaterialUIAutocompleteFieldTemplate';
import TextFieldTemplate from '../form/MaterialUITextFieldTemplate';
import FormTemplate from '../form/FormTemplate';

import pokemons from '../data/pokemon_game_data.json';

const PokemonNameType = t.enums.of(
  pokemons
    .filter( pkm => pkm["Candy To Evolve"] > 0)
    .map( pkm => pkm.Name)
);

//const YesNoType = t.enums({ 1: 'Sim', 0: 'Não' });

const Positive = t.refinement(t.Number, n => n >= 0);
Positive.getValidationErrorMessage = (value, path, context) => {
  return 'Dever ser um número positivo';
};

const PokemonFormSchema = t.struct({
  name: PokemonNameType,
  quantity: Positive,
  candies: Positive,
  //transfer: YesNoType
});

export default class FormCandyCalculator extends React.Component {

  render() {
    let options = {
      template: FormTemplate,
      fields: {
        name: {
          label: 'Qual o pokemon ?',
          template: AutoCompleteFieldTemplate,
          nullOption: false
        },
        quantity: {
          label: 'Quantidade de pokemons',
          template: TextFieldTemplate
        },
        candies: {
          label: 'Quantidade de candies',
          template: TextFieldTemplate
        },
        transfer: {
          label: 'Tranferir evoluções ?',
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
          onChange={() => {
            let value = this.refs.form.getValue();
            this.props.onFormChange(value);
          }}/>
      </div>
    );
  }
}
