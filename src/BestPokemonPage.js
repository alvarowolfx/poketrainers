import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import LinearProgress from 'material-ui/LinearProgress';

import {
  red700,
  yellow700,
  green700
} from 'material-ui/styles/colors';

import { getPokemonImageUrl } from './util/pokemon-utils';
import pokemonData from './data/pokemon_game_data.json';

const FILTERS = ['Melhor para Ataque', 'Melhor para Defesa', 'Melhor vida', 'Geral'];
const SORTERS = [
  (a,b) => b['Base Attack'] - a['Base Attack'],
  (a,b) => b['Base Defense'] - a['Base Defense'],
  (a,b) => b['Base Stamina'] - a['Base Stamina'],
  (a,b) => (b['Base Attack']+b['Base Defense']+b['Base Stamina']) - (a['Base Attack']+a['Base Defense']+a['Base Stamina']),
];

class BestPokemonPage extends Component {
  constructor(props){
    super(props);

    let filter = null;
    this.state = {
      filter,
      pokemons: pokemonData
    };
  }

  handleChange(value){
    this.setState({
      filter: value,
      pokemons: pokemonData.sort(SORTERS[value])
    });
  }

  render() {
    let itemsRadio = FILTERS.map( (value, i) => {
      return (
        <RadioButton
          key={"opt_"+i}
          value={i}
          label={value}
        />
      );
    });
    let pokemons = this.state.pokemons;
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Melhores pokemons"
            subtitle="Saiba quais pokemons os melhores pokemons para cada situação, baseado em seus status bases."
          />
          <CardText>
            <RadioButtonGroup name="radio" valueSelected={this.state.filter}
              onChange={(evt, value) => this.handleChange(value) }>
              {itemsRadio}
            </RadioButtonGroup>
          </CardText>
        </Card>
        <br/>
        <div className="pkm-list">
          {pokemons.map( (pkm,idx) => {
            return (
              <Card key={idx} className="pkm-list-best-item">
                <CardHeader title={pkm.Name} subtitle={pkm['Types'].join('/')}
                  avatar={getPokemonImageUrl(pkm.PkMn,'thumb')}/>
                <CardText>
                  {pkm['Base Attack']} Ataque
                  <LinearProgress mode="determinate"
                    min={0} max={285}
                    value={pkm['Base Attack']}
                    color={red700}/>
                  <br/>

                  {pkm['Base Defense']} Defesa
                  <LinearProgress mode="determinate"
                    min={0} max={285}
                    value={pkm['Base Defense']}
                    color={green700}/>
                  <br/>

                  {pkm['Base Stamina']} Vida
                  <LinearProgress mode="determinate"
                    min={0} max={285}
                    value={pkm['Base Stamina']}
                    color={yellow700}/>
                </CardText>
              </Card>
            );
          })}
        </div>

      </div>
    );
  }
}

export default BestPokemonPage;
