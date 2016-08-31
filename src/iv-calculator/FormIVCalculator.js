import React from 'react';

import t from 'tcomb-form';
const Form = t.form.Form;

import AutoCompleteFieldTemplate from '../form/MaterialUIAutocompleteFieldTemplate';
import TextFieldTemplate from '../form/MaterialUITextFieldTemplate';
import FormTemplate from '../form/FormTemplate';

import pokemons from '../data/pokemon_game_data.json';

import translate from '../translate';

const PokemonNameType = t.enums.of(
  pokemons.map( pkm => pkm.Name)
);

const DustType = t.enums.of([
  '400','600','800','1000',
  '1300','1600','1900','2200','2500',
  '3000','3500','4000','4500','5000',
  '6000','7000','8000','9000','10000'
]);

const PokemonFormSchema = t.struct({
  name: PokemonNameType,
  cp: t.Number,
  hp: t.Number,
  dust: DustType
});

class FormIVCalculator extends React.Component {

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
        },
        hp: {
          label: 'HP',
          template: TextFieldTemplate
        },
        dust: {
          label: t('common.form.stardust'),
          template: AutoCompleteFieldTemplate,
          nullOption: false,
          config: {
            type: 'tel'
          }
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

export default translate(FormIVCalculator);
