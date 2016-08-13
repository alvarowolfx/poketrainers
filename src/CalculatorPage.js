import React, { Component } from 'react';

import { Card, CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { pokemonByName  } from 'pokemon-go-iv-calculator/support/pokedex';
import * as ivCalculator from 'pokemon-go-iv-calculator';

import { generateChartData } from './util/pokemon-utils';

import PokemonIVList from './iv-calculator/PokemonIVList';
import FormIVCalculator from './iv-calculator/FormIVCalculator';

const POKEMON_EXAMPLE = {
  name: 'Ivysaur',
  cp: 608,
  hp: 59,
  dust: '1600'
};

class CalculatorPage extends Component {
  constructor(props){
    super(props);

    let form = {
      ...POKEMON_EXAMPLE,
      isValid: false,
    };

    this.state = {
      currentPokemon: {
        form,
        result:{},
        pokemon: {}
      },
      pokemons: []
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  componentWillMount(){
    this.onFormChange(this.state.currentPokemon.form);
  }

  addPokemon(){
    let { currentPokemon: { result }  } = this.state;
    if(result.ivs.length === 0){
      return;
    }

    let newPokemon = {
      ...this.state.currentPokemon
    };

    let pokemons = [newPokemon,...this.state.pokemons];
    let newForm = {
      ...POKEMON_EXAMPLE
    };
    this.setState({
      currentPokemon: {
        form: newForm,
      },
      pokemons,
    });
    this.onFormChange(newForm);
  }

  onRemove(i, pokemon){
    let pokemons = [...this.state.pokemons];
    pokemons.splice(i, 1);
    this.setState({
      pokemons
    });
  }

  removeAll() {
    this.setState({
      pokemons: []
    });
  }

  onFormChange(form){
    let pokemon = pokemonByName(form.name);
    let isValid = false;
    let result = ivCalculator.evaluate(form.name,
                  parseInt(form.cp,10),
                  parseInt(form.hp,10),
                  parseInt(form.dust,10));
    let chartData = generateChartData(result);
    if(chartData.length > 0){
      isValid = true;
    }
    form.isValid = isValid;
    this.setState({
      currentPokemon: {
        form,
        result,
        pokemon,
        chartData,
      }
    })
  }

  render() {
    let { currentPokemon, pokemons } = this.state;
    let cards = [{...currentPokemon}, ...pokemons];
    return (
      <div className="calculator-container">
        <Card>
          <CardHeader
            title="Calculadora de IV"
            subtitle="Saiba se seu pokemon tem potencial"
          />
          <FormIVCalculator form={currentPokemon.form}
            onFormChange={(form) => this.onFormChange(form)}/>
          <CardActions>
            <RaisedButton primary label="+ Adicionar"
              onTouchTap={() => this.addPokemon()}/>
            <RaisedButton secondary label="Limpar Tudo"
              onTouchTap={() => this.removeAll()}/>
          </CardActions>
        </Card>
        <PokemonIVList pokemons={cards}
          onRemove={(i, pokemon) => this.onRemove(i,pokemon)} />
      </div>
    );
  }
}

export default CalculatorPage;
