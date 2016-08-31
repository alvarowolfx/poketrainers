import React from 'react';

import t from 'tcomb-form';
const Form = t.form.Form;

import AutoCompleteFieldTemplate from '../form/MaterialUIAutocompleteFieldTemplate';
import TextFieldTemplate from '../form/MaterialUITextFieldTemplate';
import FormTemplate from '../form/FormTemplate';

import pokemons from '../data/pokemon_game_data.json';

import translate from '../translate';

const PokemonNameType = t.enums.of(
  pokemons
    .filter( pkm => pkm["Evolution"] !== null)
    .map( pkm => pkm.Name)
);

const Positive = t.refinement(t.Number, n => n >= 0);
Positive.getValidationErrorMessage = (value, path, context) => {
  return 'Dever ser um número positivo';
};

const PokemonFormSchema = t.struct({
  name: PokemonNameType,
  cp: Positive
});

class FormPokemonEvolve extends React.Component {

  render() {
    let { t } = this.props;
    let options = {
      template: FormTemplate,
      fields: {
        name: {
          label: t('common.form.pokemon'),
          template: AutoCompleteFieldTemplate,
          nullOption: false
        },
        cp: {
          label: t('common.form.cp'),
          template: TextFieldTemplate
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

export default translate(FormPokemonEvolve);
