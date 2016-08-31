import React from 'react';

import t from 'tcomb-form';
const Form = t.form.Form;

import SelectFieldTemplate from '../form/MaterialUISelectFieldTemplate';
import AutoCompleteFieldTemplate from '../form/MaterialUIAutocompleteFieldTemplate';
import TextFieldTemplate from '../form/MaterialUITextFieldTemplate';
import FormTemplate from '../form/FormTemplate';

import pokemons from '../data/pokemon_game_data.json';

import translate from '../translate';

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

class FormCandyCalculator extends React.Component {

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
        quantity: {
          label: t('common.form.quantity'),
          template: TextFieldTemplate
        },
        candies: {
          label: t('common.form.candies'),
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

export default translate(FormCandyCalculator);
